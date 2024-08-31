
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
