// DOM
var heightId = document.querySelector('#heightId');
var weightId = document.querySelector('#weightId');
var countId = document.querySelector('#countId');
var list = document.querySelector('#list');
var del = document.querySelector('#del');
var data = JSON.parse(localStorage.getItem('listData')) || [];


// event init
listHtml(data);

// event
countId.addEventListener('click', eventDate, false);
del.addEventListener('click', delallData, false);

function eventDate(e) {
    if (e.target.id === 'resultValue') {
        e.preventDefault();
        var w = weightId.value;
        var h = heightId.value;
        if (w == '' && h == '') {
            alert('請輸入數值哦 ( ˘•ω•˘ ).oOஇ')
            return
        };
        bmiCount(w, h);
        bmiLevel(bmi);
        upDateArray(w, h, bmi, level);
        resultHtml();
        listHtml(data);
    }
    else if (e.target.id === 'resetValue') {
        resetHtml();
        // localStorage.setItem('listData', JSON.stringify(data));
        // listHtml(data);
    }
}

function delallData(e) {
    e.preventDefault();
    data = [];
    localStorage.setItem('listData', JSON.stringify(data));
    del.classList.add('h-d-none');
    listHtml(data);
}

// Model
function bmiCount(weight, height) {
    height = height / 100;
    bmi = weight / (height * height);
    bmi = bmi.toFixed(2);
    // console.log(BMI);
    return bmi;
}

function upDateArray(weight, height, bmi) {
    var dataObject = {
        weight: weight,
        height: height,
        bmi: bmi,
        level: level,
    }
    data.push(dataObject);
    localStorage.setItem('listData', JSON.stringify(data));
}

function bmiLevel(value) {
    if (value >= 18.5 && value < 24) {
        level = '理想';
        countId.classList.add("alert--2");
    }
    else if (value >= 24 && value < 27) {
        level = '過重'
        countId.classList.add("alert--3");
    }
    else if (value >= 27 && value < 30) {
        level = '輕度肥胖'
        countId.classList.add("alert--4");
    }
    else if (value >= 30 && value < 35) {
        level = '中度肥胖'
        countId.classList.add("alert--4");
    }
    else if (value >= 35) {
        level = '重度肥胖'
        countId.classList.add("alert--5");
    }
    else {
        level = '過輕'
        countId.classList.add("alert--1");
    }
    return level;
}

//view
function resultHtml() {
    var result = `
    <div class="circle">
        <a href="#" class="resetButton" id="resetValue"></a>
            <div class="valuebox">
                <p class="circleValue">`+ bmi + `</p>
                <p class="circleValue">BMI</p>
            </div>
    </div>
    <p class="resultText">`+ level + `</p>`;
    countId.innerHTML = result;
}
function resetHtml() {
    var reset = `
        <a href="#" class="circle h2" id="resultValue">看結果</a>
    `;
    countId.innerHTML = reset;
    // 重置 class
    countId.setAttribute('class', 'result');
}

// 執行帶入 data 判斷是否有陣列資料
function listHtml(listData) {
    var dataLength = listData.length;
    var listHtml = '';
    for (var i = 0; i < dataLength; i++) {
        if (data[i].level === '理想') {
            listHtml += `
            <div class="recordBar recordBar--alert-2 h-bg-white">
                <span class="recordBar__item h3">`+ data[i].level + `</span>
                <span class="recordBar__item h3 bmi">`+ data[i].bmi + `</span>
                <span class="recordBar__item h3 weight">`+ data[i].weight + `</span>
                <span class="recordBar__item h3 height">`+ data[i].height + `</span>
            </div>
            `;
        }
        else if (data[i].level === '過重') {
            listHtml += `
            <div class="recordBar recordBar--alert-3 h-bg-white">
                <span class="recordBar__item h3">`+ data[i].level + `</span>
                <span class="recordBar__item h3 bmi">`+ data[i].bmi + `</span>
                <span class="recordBar__item h3 weight">`+ data[i].weight + `</span>
                <span class="recordBar__item h3 height">`+ data[i].height + `</span>
            </div>
            `;
        }
        else if (data[i].level === '輕度肥胖') {
            listHtml += `
            <div class="recordBar recordBar--alert-4 h-bg-white">
                <span class="recordBar__item h3">`+ data[i].level + `</span>
                <span class="recordBar__item h3 bmi">`+ data[i].bmi + `</span>
                <span class="recordBar__item h3 weight">`+ data[i].weight + `</span>
                <span class="recordBar__item h3 height">`+ data[i].height + `</span>
            </div>
            `;
        }
        else if (data[i].level === '中度肥胖') {
            listHtml += `
            <div class="recordBar recordBar--alert-4 h-bg-white">
                <span class="recordBar__item h3">`+ data[i].level + `</span>
                <span class="recordBar__item h3 bmi">`+ data[i].bmi + `</span>
                <span class="recordBar__item h3 weight">`+ data[i].weight + `</span>
                <span class="recordBar__item h3 height">`+ data[i].height + `</span>
            </div>
            `;
        }
        else if (data[i].level === '重度肥胖') {
            listHtml += `
            <div class="recordBar recordBar--alert-5 h-bg-white">
                <span class="recordBar__item h3">`+ data[i].level + `</span>
                <span class="recordBar__item h3 bmi">`+ data[i].bmi + `</span>
                <span class="recordBar__item h3 weight">`+ data[i].weight + `</span>
                <span class="recordBar__item h3 height">`+ data[i].height + `</span>
            </div>
            `;
        }
        else {
            listHtml += `
            <div class="recordBar recordBar--alert-1 h-bg-white">
                <span class="recordBar__item h3">`+ data[i].level + `</span>
                <span class="recordBar__item h3 bmi">`+ data[i].bmi + `</span>
                <span class="recordBar__item h3 weight">`+ data[i].weight + `</span>
                <span class="recordBar__item h3 height">`+ data[i].height + `</span>
            </div>
            `;
        }
    }
    if (dataLength !== 0) { del.classList.remove('h-d-none') }
    list.innerHTML = listHtml;
}

