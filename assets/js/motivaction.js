// JavaScript source code
var res = ""
function check_me() {
    var count = 0
    with (document.test) {
        if (!Q1[0].checked && !Q1[1].checked && !Q1[2].checked && !Q1[3].checked && !Q1[4].checked) { count += 1 };
        if (count > 0) { alert("Проверьте себя!") }
        else answer()
    }
}

function control(k, f1) {
    if (k == 1 && f1.checked) return true;
    return false;
}

function answer() {
    answ = "";
    with (document) {
        answ += control(test.Q1[0], test.Q1[1], test.Q1[2], test.Q1[3], test.Q1[4]) ? "" : "0"
        showResult();
    }
}

function showResult() {
    document.test.s1.
        value = "Каждый ответ является правильным. \n"
        + "Эта тема важна, потому что cостояние лесного фонда касается экономических и социальных вопросов. \n"
        + "Биоразнообразие ⇒ Устойчивость ⇒ Важность изучения современного состава и состояния лесов. \n"
        + "Осуществлять изучение феномена необходимо с использованием комплекса современных средств.";
}

function showhide(obj) {
    if (obj == 'none') return 'inline';
    else return 'none';
}