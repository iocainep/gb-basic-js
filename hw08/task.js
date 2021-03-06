/* 1. Для практикума из занятия 7 продумать, где можно применить замыкания. */

// Затрудняюсь ответить, не смог найти, где можно применить замыкание в игре.

/* 2. Не выполняя кода, ответить, что выведет браузер и почему: */

if (!("a" in window)) {
    var a = 1;
}
alert(a);

// ("a" in window) false, так как "а" не определен. !("a" in window) уже true, так как используется отрицание. Значит, условие пройдет и выведется 1.

var b = function a(x) {
    x && a(--x);
};
alert(a);

// функция присовена к переменной b, поэтому и выводить нужно было бы b. В данной случае будет undefined.

function a(x) {
    return x * 2;
}
var a;
alert(a);

// выведется код самой функция, так как в alert мы передаем ссылку на нее.

function b(x, y, a) {
    arguments[2] = 10;
    alert(a);
}
b(1, 2, 3);

// выведется 10 в alert, так как результатом работы данной функции является вывод знаечения аргумента a, а так как в первой строчке функции мы присваиваем a число 10, то и выводится 10.

function a() {
    alert(this);
}
a.call(null);

// привязываем функции a контекст null, в результате выведется window так как window это глобальный объект.