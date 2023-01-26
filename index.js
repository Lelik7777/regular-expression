let str = 'ahb acb aeb aeeb adcb axeb';
//find 'ahb', 'acb', 'aeb'
console.log(str.replace(/a.b/gi, '!'));

let str2 = 'aba aca aea abba adca abea';
//find 'abba', 'adca', 'abea'
console.log(str2.replace(/a..a/g, '!'));


let str3 = 'aba aca aea abba adca abea';
//find  'abba' и 'abea', не захватив 'adca'.
console.log(str3.replace(/ab.a/g, '!'))

///////////////////////////////////////////////////////////////////
//квантификаторы ? * +
let str4 = 'xx xax xaax xaaax xbx';
console.log(str4.replace(/xa+x/g, '!'));
console.log(str4.replace(/x*a*x/g, '!'));

let str5 = 'aa aba abba abbba abca abea';
//find 'aa', 'aba', 'abba', 'abbba' по шаблону: буква 'a', буква 'b' любое количество раз (в том числе ниодного раза), буква 'a'.
console.log(str5.replace(/ab*a/g, '!'));
//find 'aa', 'aba' по шаблону: буква 'a', буква 'b' один раз или ниодного, буква 'a'.
console.log(str5.replace(/ab?a/g, '!'));
//find  'aa', 'aba', 'abba', 'abbba', не захватив 'abca' и 'abea'.
console.log(str5.replace(/ab*a/g, '!'));

/////////////////////////////////////////////////////////////////
//группирующие скобки
let str6 = 'ab abab abab abababab abea';
//find  строка 'ab' повторяется 1 или более раз.
console.log(str6.replace(/(ab)+/g, '!'));

///////////////////////////////////////////////////////////////////
//экранировка символов через \

let str7 = 'a.a aba aea';
//find строку 'a.a', не захватив остальные.
console.log(str7.replace(/a\.a/g, '!'));

let str8 = '2+3 223 2223 2+34';
//find строку '2+3', не захватив остальные.
console.log(str8.replace(/2\+3/g, '!'));

let str9 = '23 2+3 2++3 2+++3 345 567';
//find строки '2+3', '2++3', '2+++3', не захватив остальные (+ может быть любое количество).
console.log(str9.replace(/2\++3/g, '!'));

let str10 = '23 2+3 2++3 2+++3 445 677';
//find строки '23', '2+3', '2++3', '2+++3', не захватив остальные.
console.log(str10.replace(/2\+*3/g, '!'));

let str11 = '*+ *q+ *qq+ *qqq+ *qqq qqq+';
//find  строки '*q+', '*qq+', '*qqq+', не захватив остальные.
console.log(str11.replace(/\*q+\+/g,'!'));

let str12 = '[abc] {abc} abc (abc) [abc] [s]';
//find  строки в квадратных скобках и заменят их на '!'.
console.log(str12.replace(/\[abc\]/g,'!'));

///////////////////////////////////////////////////////////////////
//фигурные скобки для указания количества повторений для элемента,после которого идут эти скобки
let str13 = 'xx xax xaax xaaax';
let res = str13.replace(/xa{1,2}x/g, '!');
console.log(res);
let str14 = 'xx xax xaax xaaax';
let res1 = str14.replace(/xa{0,3}x/g, '!');//'! ! ! !'

let str15 = 'aa aba abba abbba abbbba abbbbba';
//find  'abba', 'abbba', 'abbbba' и только их.
console.log(str15.replace(/ab{2,4}a/g,'!'));
//find 'aba', в которых 'b' встречается менее 3-х раз (включительно).
console.log(str15.replace(/ab{1,2}a/g,'!'));
//find строки вида 'aba', в которых 'b' встречается более 4-х раз (включительно).
console.log(str15.replace(/ab{4,}a/g,'!'));

////////////////////////////////////////////////////////////////////
//ограничение жадности в  регулярках с помощью оператора ?
//пример жадности,когда возвращает не то,что ожидали))
let str16 = 'aeeex zzz x kkk';
console.log(str16.replace(/a.+x/g,'!'));//'! kkk'

let str17 = 'aba accca azzza wwwwa aaa';
//find  все строки по краям которых стоят буквы 'a', и заменит каждую из них на '!'. Между буквами a может быть любой символ (кроме 'a').
console.log(str17.replace(/a.+?a/g,'!'));

///////////////////////////////////////////////////////////////////
// группы символов
//  \d - любую цифру  от 0 до 9.
//  Можно инвертировать значение команды, написав большую букву:
//   \D - все что угодно, кроме цифр
//  \s -  пробел или пробельный символ: пробел, перевод строки, табуляцию.
//  \S - все кроме пробелов
//  \w - обозначает цифру, латинскую букву или знак подчеркивания.
//  \W - все кроме букв - не буква и не цифра

let str18 = '1 12 123';
//заменить все цифры
console.log(str18.replace(/\d/g,'!'));// ! !! !!!

let str19 = '1 12 123 123abc @@@';
//заменить все числа
console.log(str19.replace(/\d+/g,'!'));// ! ! ! !abc @@@


let str20 = 'a1a a2a a3a a4a a5a aba aca';
//find строки, в которых по краям стоят буквы 'a', а между ними одна цифра.
console.log(str20.replace(/a\da/g,'!'));
let str21 = 'aa a1a a22a a333a a4444a a55555a aba aca aaa';
//find строки, в которых по краям стоят буквы 'a', а между ними любое количество цифр.
console.log(str21.replace(/a\d+a/g,'!'));
//find строки, в которых по краям стоят буквы 'a', а между ними любое количество цифр (в том числе и ноль цифр, то есть строка 'aa').
console.log(str21.replace(/a\d*a/g,'!'));
let str22 = 'avb a1b a2b a3b a4b a5b abb acb';
//find строки следующего вида: по краям стоят буквы 'a' и 'b', а между ними - не число.
console.log(str22.replace(/a\D+?b/g,'!'));
let str23 = 'ave a#b a2b a$b a4b a5b a-b acb';
//find строки следующего вида: по краям стоят буквы 'a' и 'b', а между ними - не буква и не цифра.
console.log(str23.replace(/a\Wb/g,'!'));
let str24 = 'ave a#a a2a a$a a4a a5a a-a aca';
//find которая заменит все пробелы на '!'.
console.log(str24.replace(/\s/g,'!'));

///////////////////////////////////////////////////////////////////////////////////////////////////////
//Наборы символов в регулярных выражениях JavaScript

let str25 = 'aba aea aca aza axa';
//replace по следующему шаблону: по краям стоят буквы 'a', а между ними - буква 'b', 'e' или 'x'.
console.log(str25.replace(/a[bex]a/g,'!'));
let str26 = 'a1a a3a a7a a9a aba';
//find по следующему шаблону: по краям стоят буквы 'a', а между ними - цифра от 3-х до 6-ти.
console.log(str26.replace(/a[3-6]a/g,'!'));
let str27 = 'aba aea afa aha aga';
//find по следующему шаблону: по краям стоят буквы 'a', а между ними - буква от a до g.
console.log(str27.replace(/a[a-g]a/g,'!'));
let str28 = 'aba aea afa aha aga';
//find по следующему шаблону: по краям стоят буквы 'a', а между ними - буква от a до f и от j до z.
console.log(str28.replace(/a[a-fj-z]a/g,'!'));
let str29 = 'aAXa aeffa aGha aza ax23a a3sSa';
//find по следующему шаблону: по краям стоят буквы 'a', а между ними - маленькие латинские буквы, не затронув остальных.
console.log(str29.replace(/a[a-z]+a/g,'!'));
let str30 = 'aAXa aeffa aGha aza ax23a a3sSa';
//find  по следующему шаблону: по краям стоят буквы 'a', а между ними - маленькие латинские буквы и цифры, не затронув остальных.
console.log(str30.replace(/a[a-z0-9]+a/g,'!'));

//////////////////////////////////////////////////////////////////////
//Инвертирование наборов символов в регулярках

//Напишите регулярку, которая найдет строки по шаблону: цифра '1', затем символ не 'e' и не 'x', цифра '2'.
const str31='1342 1e2 142 1r2'
console.log(str31.replace(/1[^ex]2/g,'!'));
//Напишите регулярку, которая найдет строки по шаблону: буква 'x', затем НЕ цифра от 2 до 7, буква 'z'.
const str32='xz xez xsssz x23z';
console.log(str32.replace(/x[^2-7]+?z/,'!'));
//Напишите регулярку, которая найдет строки по шаблону: буква 'x', затем НЕ большая латинская буква от 1 и более раз, буква 'z'.
const str33='xADZz xAddsz xsddz';
console.log(str33.replace(/x[^A-Z]+z/,'!'));
//Напишите регулярку, которая найдет строки по шаблону: буква 'x', затем НЕ большая маленькая латинская буква и не цифра от 1 до 5 от 1 и более раз, буква 'z'.
const str34='xz xaz xAz xsssz x$z x##%%z';
console.log(str34.replace(/x[^a-zA-Z1-5]+z/,'!'))