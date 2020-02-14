// DOM
const countId = document.querySelector('#countId');
const list = document.querySelector('#list');
const del = document.querySelector('#del');
let data = JSON.parse(localStorage.getItem('listData')) || [];

// Model
let bmiLevelData = {};
let bmiLevelClass = {
    'thin': {
        class: "alert--1",
        message: "過輕"
    },
    'normal': {
        class: "alert--2",
        message: "理想"
    },
    'heavy': {
        class: "alert--3",
        message: "過重"
    },
    'mildFat': {
        class: "alert--4",
        message: "輕度肥胖"
    },
    'moderateFat': {
        class: "alert--4",
        message: "中度肥胖"
    },
    'severeFat': {
        class: "alert--5",
        message: "重度肥胖"
    },
};

function bmiCount(weight, height) {
    height = height / 100;
    let bmi = (weight / (height * height)).toFixed(2);
    switch (true) {
        case bmi < 18.5:
            bmiLevelData.level = 'thin';
            break
        case bmi >= 18.5 && bmi < 24:
            bmiLevelData.level = 'normal';
            break
        case bmi >= 24 && bmi < 27:
            bmiLevelData.level = 'heavy';
            break
        case bmi >= 27 && bmi < 30:
            bmiLevelData.level = 'mildFat';
            break
        case bmi >= 30 && bmi < 35:
            bmiLevelData.level = 'moderateFat';
            break
        case bmi >= 35:
            bmiLevelData.level = 'severeFat';
            break
    }
    return bmi
}

function upDateArray(weight, height, bmi, time) {
    let dataObject = {
        weight: weight,
        height: height,
        bmi: bmi,
        level: bmiLevelData.level,
        time: time,
    }
    data.push(dataObject);
    localStorage.setItem('listData', JSON.stringify(data));
}

//view
function resultHtml(bmi) {
    let str = bmiLevelData.level;
    let result = `
    <div class="circle">
        <a href="#" class="resetButton" id="resetValue"></a>
            <div class="valuebox">
                <p class="circleValue">${bmi}</p>
                <p class="circleValue">BMI</p>
            </div>
    </div>
    <p class="resultText">${bmiLevelClass[str].message}</p>`;
    countId.classList.add(bmiLevelClass[str].class);
    countId.innerHTML = result;
}
function resetHtml() {
    let reset = `
        <a href="#" class="circle h2" id="resultValue">看結果</a>
    `;
    countId.innerHTML = reset;
    // 重置 class
    countId.setAttribute('class', 'result');
}

// 執行帶入 data 判斷是否有陣列資料
function listHtml(listData) {
    let dataLength = listData.length;
    let listHtml = '';
    for (let i = 0; i < dataLength; i++) {
        let str = data[i].level;
        listHtml += `
            <div class="recordBar ${bmiLevelClass[str].class} h-bg-white">
                <span class="recordBar__item h3">${bmiLevelClass[str].message}</span>
                <span class="recordBar__item h3 bmi">${data[i].bmi}</span>
                <span class="recordBar__item h3 weight">${data[i].weight}</span>
                <span class="recordBar__item h3 height">${data[i].height}</span>
                <span class="recordBar__item h6">${data[i].time}</span>
                <a href="#" class="fas fa-trash-alt" id="dellItem" data-num="${[i]}"></a>
            </div>
            `;
    }
    if (dataLength !== 0) { del.classList.remove('h-d-none') }
    list.innerHTML = listHtml;
}

// event init
listHtml(data);

// event
function eventDate(e) {
    if (e.target.id === 'resultValue') {
        e.preventDefault();
        let w = parseInt(document.querySelector('#weightId').value);
        let h = parseInt(document.querySelector('#heightId').value);
        if (isNaN(w) || isNaN(h)) {
            alert('請輸入數值哦 ( ˘•ω•˘ ).oOஇ')
            return
        };
        let bmi = bmiCount(w, h);
        let today = new Date();
        let time = `${(today.getMonth() + 1)}-${today.getDate()}-${today.getFullYear()}`;
        upDateArray(w, h, bmi, time);
        resultHtml(bmi);
        listHtml(data);
    }
    else if (e.target.id === 'resetValue') {
        resetHtml();
    }
}

function delData(e) {
    e.preventDefault();
    let dataLength = data.length;
    if (e.target.id !== 'dellItem') { return };
    let num = e.target.dataset.num;
    data.splice(num, 1);
    if (data.length == 0) { del.classList.add('h-d-none') }
    localStorage.setItem('listData', JSON.stringify(data));
    listHtml(data);
}

function delallData(e) {
    e.preventDefault();
    data = [];
    del.classList.add('h-d-none');
    localStorage.setItem('listData', JSON.stringify(data));
    listHtml(data);
}

countId.addEventListener('click', eventDate, false);
list.addEventListener('click', delData, false);
del.addEventListener('click', delallData, false);
