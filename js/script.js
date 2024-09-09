
// ---- скрыть / показать платежи и историю платежей -------
var div_history = document.getElementById('history');
var div_payments = document.getElementById('payments');
var btn_show_payments = document.getElementById('show-payments');
var btn_show_history = document.getElementById('show-history');
var hide_header = document.querySelector('header');
var hide_logo = document.getElementById('logo-panel');
var show_back = document.getElementById('back');

btn_show_history.onclick = () => {
    div_payments.style.display = 'none';
    div_history.style.display = 'block';
};
btn_show_payments.onclick = () => {
    div_history.style.display = 'none';
    div_payments.style.display = 'flex';
    if (hide_header.offsetWidth <= 650) {
        hide_header.style.display = 'none';
        hide_logo.style.display = 'none';
        show_back.style.display = 'block';
    }
};
show_back.onclick = () => {
    hide_header.style.display = 'block';
    hide_logo.style.display = 'flex';
    show_back.style.display = 'none';
    div_payments.style.display = 'none';
    div_history.style.display = 'block';
};
//--------------------------------------------
// ------- работа с платежами ----------------
var imput_num_card = document.getElementById('imput-num-card');
var imput_send_mony = document.getElementById('imput-send-mony');
var send_mony = document.getElementById('send-mony');

// function replacerCard(el) {
//     // только цифры и пробелы (пробелы ставить вручную)
//     el.value = el.value.replace(/[^0-9' ']/g, ''); 
// }

// ввод номера карты банка
imput_num_card.addEventListener('input', function (e) {
    // let value = input.value.replace(/\s+/g, '');  // Убираем все пробелы
    // только цифры (без пробелов)
    imput_num_card.value = imput_num_card.value.replace(/[^0-9]/g, '');
    let value = imput_num_card.value;
    if (value.length > 16) {
        value = value.slice(0, 16);  // Ограничиваем длину до 16 символов без пробелов
    }
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || '';  // Разбиваем по 4 символа и объединяем с пробелами
    imput_num_card.value = formattedValue;
});
// ввод суммы отправки
function replacer(el) {
    // только цифры, 0 - не первая,
    el.value = el.value.replace(/^[\D0]+|\D/g, '');
}
// отправка платежа
send_mony.onclick = () => {
    console.log(imput_num_card.value + "\n" + imput_send_mony.value);
};

// ------- Показать/Спрятать номер карты партнёра по транзакции ------------
var action_Show;
var a;
function moveRect() {
    a = a + 0.1;
    action_Show.style.marginTop = a + "em"
    if (a < 0) {
        window.requestAnimationFrame(moveRect);
    }
}
function moveRect1() {
    a = a - 0.1;
    action_Show.style.marginTop = a + "em"
    if (a > -2.5) {
        window.requestAnimationFrame(moveRect1);
    }
}

var openStrings = [];
function actionShow(idShow) {
    action_Show = document.getElementById(idShow);
    if (!openStrings.includes(action_Show)) {
        openStrings.push(action_Show);
        // console.log("open111111"); 
        a = -2.5;
        window.requestAnimationFrame(moveRect);
    } else {
        var firstIndex = openStrings.indexOf(action_Show);
        openStrings.splice(firstIndex, 1);
        // console.log("close111111");
        a = 0;
        window.requestAnimationFrame(moveRect1);
    }
    console.log(openStrings);
}
// ----------------------------------------------------------------
document.getElementById('search').onclick = function () {
    var parent = document.querySelector('#story').parentNode;
    parent.removeChild(document.querySelector('#story')); // элемент удаляется деликатно и с уважением

    // Создание контейнера даты транзакции
    const storyDiv = document.createElement('div');
    storyDiv.id = 'story';
    // Создание контейнера шапки истории платежей
    const storyHeadDiv = document.createElement('div');
    storyHeadDiv.className = 'story-head';

    const discrip = document.createElement('p');
    discrip.textContent = "Описание платежа";

    // Создание контейнера шапки истории платежей
    const storyMonyDiv = document.createElement('div');
    storyMonyDiv.className = 'story-mony';

    const sum = document.createElement('p');
    sum.textContent = "Сумма, SYM";
    const balance = document.createElement('p');
    balance.textContent = "Баланс, SYM";

    var div_history = document.getElementById('history');

    div_history.appendChild(storyDiv);
    storyDiv.appendChild(storyHeadDiv);
    storyHeadDiv.appendChild(discrip);
    storyHeadDiv.appendChild(storyMonyDiv);
    storyMonyDiv.appendChild(sum);
    storyMonyDiv.appendChild(balance);
}


function createTransaction(date) {
    // Создание контейнера даты транзакции
    const dateDiv = document.createElement('div');
    dateDiv.className = 'date-transaction';
    dateDiv.textContent = date;

    // Добавление контейнера даты в контейнер истории
    const storyDiv = document.getElementById('story');
    storyDiv.appendChild(dateDiv);

    function createOneTransaction(time, name, amount, balance, sender, name_actionShow) {
        // Создание контейнера одной транзакции
        const transactionDiv = document.createElement('div');
        transactionDiv.className = 'one-transaction';

        // Создание основного блока информации о транзакции
        const mainInfoDiv = document.createElement('div');
        mainInfoDiv.className = 'main-info-transaction';
        mainInfoDiv.setAttribute('onclick', `actionShow('${name_actionShow}')`);

        // Создание контейнера для времени и имени транзакции
        const containerNameDiv = document.createElement('div');
        containerNameDiv.className = 'container-name';

        const timeLabel = document.createElement('label');
        timeLabel.className = 'time-transaction';
        timeLabel.textContent = time;

        const nameP = document.createElement('p');
        nameP.className = 'name-transaction';
        nameP.textContent = name;

        containerNameDiv.appendChild(timeLabel);
        containerNameDiv.appendChild(nameP);

        // Создание контейнера для суммы и баланса
        const storyMonyDiv = document.createElement('div');
        storyMonyDiv.className = 'story-mony';

        const amountP = document.createElement('p');
        amountP.textContent = amount;

        const balanceP = document.createElement('p');
        balanceP.textContent = balance;

        storyMonyDiv.appendChild(amountP);
        storyMonyDiv.appendChild(balanceP);

        // Добавление контейнеров в основной блок информации
        mainInfoDiv.appendChild(containerNameDiv);
        mainInfoDiv.appendChild(storyMonyDiv);

        // Создание дополнительного блока информации о транзакции
        const moreInfoDiv = document.createElement('div');
        moreInfoDiv.className = 'more-info-transaction';
        moreInfoDiv.id = name_actionShow;

        const senderLabel = document.createElement('label');
        senderLabel.textContent = 'Отправитель:';

        const senderValue = document.createElement('label');
        senderValue.textContent = sender;

        moreInfoDiv.appendChild(senderLabel);
        moreInfoDiv.appendChild(senderValue);

        // Добавление основных и дополнительных блоков в контейнер одной транзакции
        transactionDiv.appendChild(mainInfoDiv);
        transactionDiv.appendChild(moreInfoDiv);

        // Добавление одной транзакции в контейнер истории
        storyDiv.appendChild(transactionDiv);
    }
    createOneTransaction('14:25', 'ВасяПупкин ПупкинПупкинПупкин', '+ 1 200 000', '1 200 000', '0000 0000 0000 0000', 'actionShow5');
    createOneTransaction('18:35', 'Иван Крузенштейн', '+ 1 200 000', '1 200 000', '0000 0000 0000 0000', 'actionShow6');
}
createTransaction('8 августа');
