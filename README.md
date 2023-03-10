# Regular Expression

[source:](https://code.mu/ru/javascript/book/supreme/regular/intro/)

Регулярные выражения - это такие команды для сложного поиска и замены (или просто поиска)

'bab'.replace('a', '!'); // вернет 'b!b'

А вот **точка является специальным символом и обозначает любой символ**. В следующем примере мы найдем строку по такому шаблону: буква 'x', затем любой символ, затем опять буква 'x':

'xax eee'.replace(/x.x/, '!'); // вернет '! eee'

После ограничителей можно писать **модификаторы** - команды, которые изменяют общие свойства регулярного выражения. Например, **модификатор g** включает режим глобального поиска и замены - без него регулярка ищет только первое совпадение, а с ним - все совпадения.

В следующем примере не указан модификатор g и регулярка найдет только первое совпадение:

'aab'.replace(/a/,  '!'); // вернет '!ab'

А теперь регулярка найдет все совпадения:

'aab'.replace(/a/g, '!'); // вернет '!!b'

## Операторы повторения символов в регулярках

Бывают ситуации, когда мы хотим указать, что символ повторяется заданное количество раз. 

Для этого существуют **операторы (*квантификаторы*) повторения**: плюс + (один и более раз), звездочка * (ноль или более раз) и вопрос ? (ноль или один раз). Эти операторы действуют на тот символ, который стоит перед ними.

### Пример
Найдем все подстроки по шаблону буква 'x', буква 'a' один или более раз, буква 'x':

let str = 'xx xax xaax xaaax xbx';

let res = str.replace(/xa+x/g, '!');

В результате в переменную res запишется следующее:

'xx ! ! ! xbx'

### Пример
Найдем все подстроки по шаблону буква 'x', буква 'a' ноль или более раз, буква 'x':

let str = 'xx xax xaax xaaax xbx'

let res = str.replace(/xa*x/g, '!');

В результате в переменную запишется следующее:

'! ! ! ! xbx'

### Пример

Найдем все подстроки по шаблону буква 'x', буква 'a' ноль или один раз, буква 'x':

let str = 'xx xax xaax xbx';

let res = str.replace(/xa?x/g, '!');

В результате в переменную запишется следующее:

'! ! xaax xbx'

## Группирующие скобки в регулярках JavaScript

В предыдущих примерах операторы повторения действовали только на один символ, который стоял перед ними. Что делать, если мы хотим подействовать им на несколько символов?

Для этого существуют **группирующие скобки '(' и ')'.** Они работают так: если что-то стоит в группирующих скобках и сразу после ')' стоит оператор повторения - он подействует на все, что стоит внутри скобок.

Давайте посмотрим на примерах.

### Пример
В следующем примере шаблон поиска выглядит так: буква 'x', далее строка 'ab' один или более раз, потом буква 'x':

let str = 'xabx xababx xaabbx'

let res = str.replace(/x(ab)+x/g, '!');

В результате в переменную запишется следующее:

'! ! xaabbx'

##  Экранировка спецсимволов в регулярках JavaScript

Предположим, что мы хотим сделать так, чтобы спецсимвол обозначал сам себя. Для этого его нужно экранировать с помощью обратного слеша. Давайте посмотрим на примерах.

### Пример
В следующем примере автор регулярки хотел, чтобы шаблон поиска выглядел так: буква 'a', затем плюс '+', затем буква 'x'. Однако, автор кода не заэкранировал символ '+' и поэтому шаблон поиска самом деле он выглядит так: буква 'a' один или более раз, потом буква 'x':

let str = 'a+x ax aax aaax';

let res = str.replace(/a+x/g, '!');

В результате в переменную запишется следующее:

'a+x ! ! !'

### Пример
А сейчас автор заэкранировал плюс обратным слешем. Теперь шаблон поиска выглядит так, как надо: буква 'a', затем плюс '+', затем буква 'x'.

let str = 'a+x ax aax aaax';

let res = str.replace(/a\\+x/g, '!');

В результате в переменную запишется следующее:

'! ax aax aaax'

### Пример
В данном примере шаблон выглядит так: буква 'a', затем точка '.', затем буква 'x':

let str = 'a.x abx azx';

let res = str.replace(/a\\.x/g, '!');

В результате в переменную запишется следующее:

'! abx azx'

### Пример
А следующем примере автор забыл заэкранировать слеш и под регулярку попали все подстроки, так как незаэкранированная точка обозначает любой символ:

let str = 'a.x abx azx';

let res = str.replace(/a.x/g, '!');

В результате в переменную запишется следующее:

'! ! !'

### Замечание
Обратите внимание на то, что если вы забудете обратный слеш для точки (когда она должна обозначать сама себя) - этого можно даже не заметить:

'a.x'.replace(/a.x/g, '!'); // вернет '!', как мы и хотели
Визуально работает правильно (так как точка обозначает любой символ, в том числе и обычную точку '.'). Но если поменять строку, в которой происходят замены - мы увидим нашу ошибку:

'a.x abx azx'.replace(/a.x/g, '!'); // вернет '! ! !', а ожидалось '! abx azx'

Список специальных символов и обычных
Если экранировать обычный символ - ничего страшного не случится - он все равно будет обозначать сам себя. Исключение - цифры, их нельзя экранировать.

Часто возникает сомнение, является ли данный символ специальным. Некоторые доходят до того, что экранируют все подозрительные символы подряд. Однако, это плохая практика (захламляет регулярку обратными слешами).

- Являются спецсимволами: $ ^ . * + ? \ / {} [] () |

- Не являются спецсимволами: @ : , ' " ; - _ = < > % # ~ `& !

## Фигурные скобки в регулярных выражения JavaScript

Операторы '+', '*', '?' хороши, однако, с их помощью нельзя указать конкретное число повторений. В этом случае вам на помощь придет **оператор {}**.

Работает он следующим образом: {5} - пять повторений, {2,5} – повторяется от двух до пяти (оба включительно), {2,} - повторяется два и более раз. Обратите внимание на то, что такого варианта - {,2} - нет. Посмотрите примеры:

### Пример
В данном примере шаблон поиска выглядит так: буква 'x', буква 'a' один или два раза, буква 'x':

let str = 'xx xax xaax xaaax';

let res = str.replace(/xa{1,2}x/g, '!');

В результате в переменную запишется следующее:

'xx ! ! xaaax'

### Пример
В данном примере шаблон поиска выглядит так: буква 'x', буква 'a' два раза и более, буква 'x':

let str = 'xx xax xaax xaaax';

let res = str.replace(/xa{2,}x/g, '!');

В результате в переменную запишется следующее:

'xx xax ! !'

### Пример
В данном примере шаблон поиска выглядит так: буква 'x', буква 'a' три раза, буква 'x':

let str = 'xx xax xaax xaaax';

let res = str.replace(/xa{3}x/g, '!');

В результате в переменную запишется следующее:

'xx xax xaax !'

### Пример
В данном примере шаблон поиска выглядит так: буква 'a' десять раз:

let str = 'aaa aaaaaaaaaa aaa';

let res = str.replace(/a{10}/g, '!');

В результате в переменную запишется следующее:

'aaa ! aaa'

### Пример
В данном примере автор кода хотел такой шаблон: буква 'x', буква 'a' три раза раза и меньше, буква 'x', но, к сожалению, такое - {,3} - не работает. Нужно указать явно:

let str = 'xx xax xaax xaaax';

let res = str.replace(/xa{1,3}x/g, '!');

В результате в переменную запишется следующее:

'xx ! ! !'

### Пример
Ноль тоже допустим:

let str = 'xx xax xaax xaaax';

let res = str.replace(/xa{0,3}x/g, '!');

В результате в переменную запишется следующее:

'! ! ! !'

## Ограничение жадности в регулярках в JavaScript

Регулярные выражения по умолчанию жадные. Это значит, что они захватывают максимальное возможное количество символов.

Давайте разберем на примере. Пусть у нас есть вот такая строка:

let str = 'aeeex zzz x kkk';

Пусть мы в этой строке хотим найти подстроку 'aeeex' по следующему шаблону: буква 'a', затем любой символ один или более раз, затем буква 'x'.

let res = str.replace(/a.+x/g, '!');

Мы ожидаем, что в переменную res в результате запишется строка '! zzz x kkk'. Однако, это не так - в переменную попадает строка '! kkk'.

Все дело в том, что наша регулярка ищет все символы от буквы 'a' до буквы 'x'. Но в нашей строке две буквы 'x'! Из-за жадности получается, что регулярка ищет до самого последнего икса, тем самым захватывая не то, что мы ожидали.

Конечно, зачастую такое поведение нам и нужно. Но конкретно в этом случае мы бы хотели отменить жадность и сказать регулярке, чтобы она искала до первого икса.

Чтобы ограничить жадность, нужно после оператора повторения поставить **знак вопроса**:

let res = str.replace(/a.+?x/g, '!');

Жадность можно ограничивать всем операторам повторения: и *, и ?, и {} - вот так: *?, ?? и {}?.

## Группы символов в регулярных выражениях JavaScript

Существуют специальные команды, которые позволяют выбрать сразу целые группы символов. Команда **\d означает цифру от 0 до 9**. Команда **\w обозначает цифру, латинскую букву или знак подчеркивания**. Команда **\s обозначает пробел или пробельный символ**: пробел, перевод строки, табуляцию. **Можно инвертировать значение команды, написав большую букву**: например, если \d - цифра, то **\D** - не цифра.

### Пример
Давайте найдем все цифры:

let str = '1 12 123';

let res = str.replace(/\d/g, '!');

В результате в переменную запишется следующее:

'! !! !!!'

### Пример
Операторы повторения считают команды-группы одним целым, то есть группирующие скобки не нужны. В следующем примере шаблон поиска выглядит так: цифра от 0 до 9 один или более раз:

let str = '1 12 123 abc @@@';

let res = str.replace(/\d+/g, '!');

В результате в переменную запишется следующее:

'! ! ! abc @@@'

### Пример
В следующем примере шаблон поиска выглядит так: все что угодно один или более раз, но не цифра от 0 до 9:

let str = '123abc3@@';

let res = str.replace(/\D+/g, '!');

В результате в переменную запишется следующее:

'123!3!'

### Пример
В данном примере шаблон поиска выглядит так: пробельный символ один раз:

let str = '1 12 123 abc @@@';

let res = str.replace(/\s/g, '!');

В результате в переменную запишется следующее:

'1!12!123!abc!@@@'

### Пример
В данном примере шаблон поиска выглядит так: НЕ пробельный символ один или более раз. Все подстроки, разделенные пробелами, заменятся на '!':

let str = '1 12 123 abc @@@';

let res = str.replace(/\S+/g, '!');

В результате в переменную запишется следующее:

'! ! ! ! !'

### Пример
В данном примере шаблон поиска выглядит так: цифра или буква один или более раз. Все подстроки, состоящие из цифр и букв, заменятся на '!':

let str = '1 12 123a Abc @@@';

let res = str.replace(/\w+/g, '!');

В результате в переменную запишется следующее:

'! ! ! ! @@@'

### Пример
В данном примере шаблон поиска выглядит так: НЕ цифра и НЕ буква один или более раз. Под данное определение в нашем случае попадает '@@@' и все пробелы (они ведь тоже не цифры и не буквы). Обратите внимание на то, что в конце один '!' - в него преобразовалась строка ' @@@' - с пробелом впереди:

let str = '1 12 123 Abc @@@';

let res = str.replace(/\W+/g, '!');

В результате в переменную запишется следующее:

'1!12!123!Abc!'

## Наборы символов в регулярных выражениях JavaScript

Группы символов \d и \w не очень гибкие. Даже такая простая задача, как найти все буквы, но не цифры - не может быть решена ими. Для таких задач следует использовать **квадратные скобки, представляющие собой операцию 'или'**.

Квадратные скобки заменяют собой один символ, любой из перечисленных внутри. К примеру, вот так: /x[abc]x/ - мы говорим, что по краям должны стоять буквы икс, а внутри - один символ: или 'a', или 'b', или 'c'.

**После квадратных скобок можно писать операторы повторения**. К примеру, вот так: /x[abc]+x/ - мы говорим, что внутри иксов может быть любое количество символов 'a', 'b' и 'c' - в любых комбинациях.

Можно не только перечислять символы, но **создавать группы символов, записывая между двумя символами дефис**. К примеру, вот так: [a-d] - мы получаем все символы от 'a' до 'd'.

Давайте посмотрим на примерах.

### Пример
В данном примере шаблон поиска выглядит так: между иксами любая буква от 'a' до 'z':

let str = 'xax xbx xcx x@x';

let res = str.replace(/x[a-z]x/g, '!');

В результате в переменную запишется следующее:

'! ! ! x@x'

### Пример
В данном примере шаблон поиска выглядит так: между иксами любая буква от 'a' до 'k':

let str = 'xax xbx xmx x@x';

let res = str.replace(/x[a-k]x/g, '!');

В результате в переменную запишется следующее:

'! ! xmx x@x'

### Пример
В данном примере шаблон поиска выглядит так: между иксами любая буква от 'A' до 'Z':

let str = 'xax xBx xcx x@x';

let res = str.replace(/x[A-Z]x/g, '!');

В результате в переменную запишется следующее:

'xax ! xcx x@x'

### Пример
В данном примере шаблон поиска выглядит так: между иксами любая цифра от 0 до 9:

let str = 'xax x1x x3x x5x x@x';

let res = str.replace(/x[0-9]x/g, '!');

В результате в переменную запишется следующее:

'xax ! ! ! x@x'

### Пример
В данном примере шаблон поиска выглядит так: между иксами любая цифра от 3 до 7:

let str = 'xax x1x x3x x5x x@x';

let res = str.replace(/x[3-7]x/g, '!');

В результате в переменную запишется следующее:

'xax x1x ! ! x@x'

### Пример
В данном примере шаблон поиска выглядит так: между иксами любая буква от 'a' до 'z' или цифра от 1 до 9:

let str = 'xax x1x x3x x5x x@x';

let res = str.replace(/x[a-z1-9]x/g, '!');

В результате в переменную запишется следующее:

'! ! ! ! x@x'

### Пример
В данном примере шаблон поиска выглядит так: между иксами любая буква от 'a' до 'z' или буква от 'A' до 'Z':

let str = 'xax xBx xcx x5x x@x';

let res = str.replace(/x[a-zA-Z]x/g, '!');

В результате в переменную запишется следующее:

'! ! ! x5x x@x'

### Пример
В данном примере шаблон поиска выглядит так: между иксами любая буква от 'a' до 'z' или цифры 1, 2:

let str = 'xax xbx x1x x2x x3x';

let res = str.replace(/x[a-z12]x/g, '!');

В результате в переменную запишется следующее:

'! ! ! ! x3x'

### Пример
В данном примере шаблон поиска выглядит так: между иксами буквы от 'a' до 'z' в количестве от 1 и более:

let str = 'xx xabesx xaadx x123x xa3x';

let res = str.replace(/x[a-z]+x/g, '!');

В результате в переменную запишется следующее:

'xx ! ! ! x123x xa3x'

### Пример
Сделаем так, чтобы количество букв могло быть и ноль:

let str = 'xx xabesx xaadx x123x xa3x';

let res = str.replace(/x[a-z]*x/g, '!');

В результате в переменную запишется следующее:

'! ! ! ! x123x xa3x'

## Инвертирование наборов символов в регулярках

С помощью **шляпки '^' в начале квадратных скобок можно инвертировать желаемое**. То есть, если, к примеру, команда [ab] ищет букву 'a' или 'b', то команда [^ab] будет искать все символы, кроме 'a' и 'b'.

### Пример
В данном примере шаблон поиска выглядит так: буква 'x', затем НЕ буква 'a', не 'b' и не 'c', потом буква 'z':

let str = 'xaz xbz xcz xez';

let res = str.replace(/x[^abc]z/g, '!');

В результате в переменную запишется следующее:

'xax xbx xcx !'

### Пример
В данном примере шаблон поиска выглядит так: буква 'x', затем НЕ маленькая латинская буква, потом буква 'z':

let str = 'xaz xbz x1z xСz';

let res = str.replace(/x[^a-z]z/g, '!');

В результате в переменную запишется следующее:

'xaz xbz ! !'

## Особенности кириллицы в регулярках JavaScript

Кириллические символы не входят в группу \w. Для их получения нужно использовать группу в квадратных скобках, вот так: [а-я]. Но даже с этой группой есть проблема - сюда не войдет буква 'ё'. Для ее включения нужно сделать вот так: [а-яё].

## Спецсимволы внутри квадратных скобок в JavaScript

**Спецсимволы внутри [ ] становятся обычными символами**. Это значит, что их не надо экранировать обратным слешем.

### Пример
В данном примере шаблон поиска выглядит так: между иксами любая буква 'a', 'b', 'c', либо точка:

let str = 'xax xbx xcx xdx x.x x@x';

let res = str.replace(/x[abc.]x/g, '!');

В результате в переменную запишется следующее:

'! ! ! xdx ! x@x'

### Пример
В данном примере шаблон поиска выглядит так: между иксами любая маленькая латинская буква или точка:

let str = 'xax xbx xcx x@x';

let res = str.replace(/x[a-z.]x/g, '!');

В результате в переменную запишется следующее:

'! ! ! x@x'

## Группы символов внутри квадратных скобок JavaScript

**Группы символов \d, \D, \w, \W, \s, \S внутри [ ] будут обозначать именно группы, то есть по-прежнему будут командами.**

### Пример
В данном примере шаблон поиска выглядит так: между иксами любая цифра, либо буква от 'a' до 'f':

let str = 'xax xbx x1x x2x xhx x@x';

let res = str.replace(/x[\da-f]x/g, '!');

В результате в переменную запишется следующее:

'! ! ! ! xhx x@x'

### Пример
В данном примере шаблон поиска выглядит так: буква 'x', затем не цифра, не точка, и не маленькая латинская буква, затем буква 'z':

let str = 'xaz x1z xAz x.z x@z';

let res = str.replace(/x[^\d.a-z]z/g, '!');

В результате в переменную запишется следующее:

'xaz x1z ! x.z !'

## Спецсимволы-исключения внутри квадратных скобок

Вы уже знаете, что спецсимволы внутри [ ] становятся обычными символами. Есть, однако, исключения: если вам нужны квадратные скобки как символы внутри [ ] - то их нужно экранировать обратным слешем.

Для примера в следующем коде шаблон поиска выглядит так: между иксами стоит квадратная скобка:

let str = 'x]x xax x[x x1x';

let res = str.replace(/x[\[\]]x/g, '!');

В результате в переменную запишется следующее:

'! xax ! x1x'
## Символ каретки(шляпки)  внутри квадратных скобок регулярок

Как вы знаете, каретка внутри [ ] делает отрицание, будучи написанной в начале скобок. Значит, она является спецсимволом внутри этих скобок. **Чтобы получить каретку как символ, нужно или заэкранировать ее, или убрать с первого места.**

### Пример
В следующем примере шаблон поиска такой: первый символ - это все кроме 'd', потом две буквы 'x'.

let str = 'axx bxx ^xx dxx';

let res = str.replace(/[^d]xx/g, '!');

В результате в переменную запишется следующее:

'! ! ! dxx'

### Пример
А теперь шаблон поиска такой: первый символ - это 'd' или '^', потом две буквы 'x':

let str = 'axx bxx ^xx dxx';

let res = str.replace(/[d^]xx/g, '!');

В результате в переменную запишется следующее:

'axx bxx ! !'

### Пример
Можно не убирать шляпку с первого места, а просто заэкранировать ее с помощью обратного слеша, и она станет обозначать саму себя:

let str = 'axx bxx ^xx dxx';

let res = str.replace(/[\\^d]xx/g, '!');

В результате в переменную запишется следующее:

'axx bxx ! !'

## Особенности дефиса внутри квадратных скобок

Дефис - тоже спецсимвол внутри [ ] (а вот снаружи - нет). **Если вам нужен сам дефис как символ - то поставьте его там, где он не будет воспринят как разделитель группы.**

Почему это важно: вы можете сделать группу символов, сами не заметив этого. К примеру, вот так - '[:-@]' - вы думаете, что выбираете двоеточие, дефис и собаку, а на самом деле получается группа символов между : и @. В эту группу входят следующие символы: : ; ? < = >

Откуда они взялись? Из таблицы ASCII - двоеточие имеет номер меньше, чем собака - и получается группа. То есть все группы получаются по таблице ASCII (при желании этим можно пользоваться).

Как с этим бороться: поставьте символ дефиса там, где он точно не будет воспринят как символ группы, например, в начале или в конце (то есть после [или перед ]).

Можно также заэкранировать дефис - тогда он будет обозначать сам себя независимо от позиции. Например, вместо [:-@] написать [:\\-@] - и группы уже не будет, а будут три символа - двоеточие, дефис и собака @.

### Пример
В следующем примере шаблон поиска такой: цифра 1, затем буква от 'a' до 'z', затем цифра 2:

let str = '1a2 1-2 1c2 1z2';

let res = str.replace(/1[a-z]2/g, '!');

В результате в переменную запишется следующее:

'! 1-2 ! !'

### Пример
Давайте теперь заэкранируем дефис. В результате шаблон поиска такой: цифра 1, затем буква 'a', или дефис, или буква 'z', затем цифра 2:

let str = '1a2 1-2 1c2 1z2';

let res = str.replace(/1[a\\-z]2/g, '!');

В результате в переменную запишется следующее:

'! ! 1c2 !'

### Пример
Можно просто переставить дефис, не экранируя его:

let str = '1a2 1-2 1c2 1z2';

let res = str.replace(/1[az-]2/g, '!');

В результате в переменную запишется следующее:

'! ! 1c2 !'

### Пример
В следующем примере шаблон поиска такой: первый символ - это маленькие буквы или дефис '-', потом две буквы 'x':

let str = 'axx Axx -xx @xx';

let res = str.replace(/[a-z-]xx/g, '!');

В результате в переменную запишется следующее:

'! Axx ! @xx'

### Пример
В следующем примере шаблон поиска такой: первый символ - это маленькие, большие буквы или дефис '-', потом две буквы 'x':

let str = 'axx Axx -xx @xx';

let res = str.replace(/[a-zA-Z-]xx/g, '!');

В результате в переменную запишется следующее:

'! ! ! @xx'

### Пример
Можно расположить дефис между двумя группами - там он точно еще не сделает еще одну группу:

let str = 'axx 9xx -xx @xx';

let res = str.replace(/[a-z-0-9]xx/g, '!');

В результате в переменную запишется следующее:

'! ! ! @xx'

## Начало и конец строки в регулярках JavaScript
Существуют **специальные символы, которые обозначают начало '^' или конец строки '$'.** Давайте посмотрим их работу на примерах.

### Пример
В данном примере шаблон поиска такой: заменить 'aaa' на '!' только, если оно стоит в начале строки:

let str = 'aaa aaa aaa';

let res = str.replace(/^aaa/g, '!');

В результате в переменную запишется следующее:

'! aaa aaa'

### Пример
В данном примере шаблон поиска такой: заменить 'aaa' на '!' только, если оно стоит в конце строки:

let str = 'aaa aaa aaa';

let res = str.replace(/aaa$/g, '!');

В результате в переменную запишется следующее:

'aaa aaa !'

### Пример
Когда в начале регулярки стоит '^', а в конце - '$', то таким образом мы проверяем всю строку целиком на соответствие регулярке.

В следующем примере шаблон поиска такой: буква 'a' повторяется один или более раз, заменить всю строку на '!' только она состоит из одних букв 'a'.

let str = 'aaa';

let res = str.replace(/^a+$/g, '!');

В результате в переменную запишется следующее:

'!'

## Команда 'или' в регулярных выражениях JavaScript

В данном уроке мы с вами разберем **команду '|',** которая представляет собой более мощный вариант 'или' по сравнению с командой [ ]. Данная команда **позволяет разделить регулярку на несколько частей. При этом искомое может попасть либо под одну часть регулярки, либо под другую.** Давайте посмотрим на примерах.

### Пример
В данном примере шаблон поиска такой: три буквы 'a' или три буквы 'b':

let str = 'aaa bbb abb';

let res = str.replace(/a{3}|b{3}/g, '!');

В результате в переменную запишется следующее:

'! ! abb'

### Пример
В данном примере шаблон поиска такой: три буквы 'a' или от 1 и более букв 'b':

let str = 'aaa bbb bbbb bbbbb axx';

let res = str.replace(/a{3}|b+/g, '!');

В результате в переменную запишется следующее:

'! ! ! ! axx'

### Пример
В данном примере шаблон поиска такой: одна или более буквы или три цифры:

let str = 'a ab abc 1 12 123';

let res = str.replace(/[a-z]+|\d{3}/g, '!');

В результате в переменную запишется следующее:

'! ! ! 1 12 !'

### Пример
Вертикальная черта может делить регулярку не на две части, а на любое количество частей:

let str = 'aaa bbb ccc ddd';

let res = str.replace(/a+|b+|c+/g, '!');

В результате в переменную запишется следующее:

'! ! ! ddd'

### Пример
Если вертикальная черта стоит внутри круглых скобок, то 'или' работает только внутри этих скобок.

Для примера давайте найдем строки по следующему шаблону: в начале стоит или 'a', или 'b' один или более раз, а потом две буквы 'x':

let str = 'axx bxx bbxx exx';


let res = str.replace(/(a|b+)xx/g, '!');

В результате в переменную запишется следующее:

'! ! ! exx'

## Метод test в регулярных выражениях JavaScript
В данном уроке мы с вами рассмотрим **метод test, который проверяет, есть ли в строке хотя бы одно совпадение с регуляркой. Если есть - возвращается true, а если нет - false. Метод параметром принимает строку, а применяется к регулярке, вот так: регулярка.test(где искать)**.

Давайте для примера проверим какую-нибудь строку на соответствие регулярке:

/a+/.test('eee aaa bbb'); // вернет true
Часто данный метод используется для проверки на соответствие регулярному выражению целой строки. В этом случае в начале регулярки ставят шляпку, а в конце - доллар:

/^a+$/.test('aaaaaaaaa'); // вернет true

## Метод match с модификатором g в JavaScript

Давайте теперь разберем следующий полезный метод - метод match. Он позволяет получить ту часть строки, которая попала под регулярное выражение.

**Этот метод работает по-разному в зависимости от того, есть модификатор g или нет. Если он есть - метод возвращает массив подстрок, которые попали под регулярное выражение. Если же совпадений нет, то возвращает null.**

### Пример
Давайте получим массив подстрок, состоящих из букв 'a':

let str = 'a aa aaa aaaa';

let res = str.match(/a+/g);

В результате в переменную запишется следующее:

['a', 'aa', 'aaa', 'aaaa']

### Пример
Давайте получим массив чисел:

let str = '1 23 456 789';

let res = str.match(/\d+/g);

В результате в переменную запишется следующее:

['1', '23', '456', '789']

### Пример
Давайте получим массив всех цифр:

let str = '1 23 456 789';

let res = str.match(/\d/g);

В результате в переменную запишется следующее:

['1', '2', '3', '4', '5', '6', '7', '8', '9']

## Карманы для метода match

Давайте теперь разберемся, почему найденное попадает в нулевой элемент массива с результатом. Дело в том, что в остальные элементы этого массива попадают карманы.

Карманы представляют собой способ разбить найденное на отдельные части. Для их использования нужно заключить часть регулярки в круглые скобки. В этом случае в массиве с результатом кроме найденной строки также появится и то, что попало под регулярку, стоящую в этих скобках.

В следующем примере мы ищем строки по шаблону буквы 'x', а между ними - от одной и более букв 'a'. При этом найденные буквы 'a' попадут в карман:

let str = 'sss xaaax zzz';

let res = str.match(/x(a+)x/);

console.log(res[0]); // выведет 'xaaax' - найденное

console.log(res[1]); // выведет 'aaa'   - карман

Можно использовать не один карман, а несколько. В этом случае первые скобки будут первым карманом, вторые - вторым и так далее. Смотрите пример:

let str = 'sss xaaa-bbbx zzz';

let res = str.match(/x(a+)-(b+)x/);

console.log(res[0]); // выведет 'xaaax-bbbx' - найденное

console.log(res[1]); // выведет 'aaa'   - 1 карман

console.log(res[2]); // выведет 'bbb'   - 2 карман

## Карманы в методе replace в регулярках JavaScript

**При работе с методом replace, если мы что-то положим в карман в регулярке, то в строке замены мы можем вставить содержимое этого кармана написав знак доллара $ и номер кармана.** Например, $1 - первый карман, $2 - второй карман и так далее.

Зачем это нужно и как этим пользоваться давайте посмотрим на примерах.

### Пример
Давайте найдем все числа и вместо них вставим эти же числа, но в круглых скобках. Для этого все найденные числа мы будем заменять на них самих же, но в скобках:

let str = '1 23 456 xax';

let res = str.replace(/(\d+)/g, '($1)');

В результате в переменную запишется следующее:

'(1) (23) (456) xax'

### Пример
Давайте найдем все строки, представляющие собой числа с иксами вокруг и заменим эти числа на них же, но с '!' знаками вокруг:

let str = 'x1x x23x x456x xax';

let res = str.replace(/x(\d+)x/g, '!$1!');

В результате в переменную запишется следующее:

'!1! !23! !456! xax'

### Пример
Давайте решим следующую задачу: даны строки вида 'aaa@bbb' - буквы, потом собака, потом буквы. Нужно поменять местами буквы до @ и после.

let str = 'aaa@bbb ссс@ddd';

let res = str.replace(/([a-z]+)@([a-z]+)/g, '$2@$1');

В результате в переменную запишется следующее:

'bbb@aaa ddd@ссс'

## Карманы по умолчанию в методе replace в JavaScript

В методе replace, помимо карманов с вашими номерами, всегда доступны также стандартные карманы: $ & - всё найденное совпадение, $ ` и $ ' -часть строки до и после совпадения. Давайте посмотрим работу с ними на примерах.

### Пример
Давайте найдем все числа и обернем их в круглые скобки:

let str = '1 23 456';

let res = str.replace(/\d+/g, '($&)');

В результате в переменную запишется следующее:

'(1) (23) (456)'

### Пример
Давайте найдем символ @ и заменим его на то, что стоит перед ним, собаку, и то, что стоит после него. Все это запишем в круглых скобках:

let str = '123@456';

let res = str.replace(/@/g, "($`@$')");

В результате в переменную запишется следующее:


'123(123@456)456'
### Пример
Пусть мы хотим найти доллар и обернуть его в кавычки ``. В этом случае, чтобы $` не было воспринято как команда, доллар нужно удвоить:

let str = 'aaa $ bbb';

let res = str.replace(/\$/g, '`$$`');

В результате в переменную запишется следующее:

'aaa `$` bbb'

## Карманы в самой регулярке в JavaScript

Содержимое карманов доступно не только в строке замены, но в и самой регулярке: мы можем положить что-нибудь в карман, а затем прямо в регулярке сказать, что здесь должно стоять содержимое этого кармана.

Содержимое карманов доступно по их номерам, перед которыми стоит обратный слеш. Например, первый карман будет доступен вот так: \1, второй карман вот так - \2, третий - \3 и так далее.

Уверен, что все написанное выше пока весьма туманно для вас. Это не удивительно, так какие карманы - самое малопонятное место регулярок. Давайте будем разбираться на примерах.

### Пример
Пусть у нас есть вот такая строка:

let str = 'aa bb cd ef';

Давайте найдем в ней все места, в которых стоят две любые одинаковые буквы подряд. Для решения задачи будем искать любую букву, класть ее в карман, а затем проверять, идет ли следующем символом содержимое этого кармана:

let res = str.replace(/([a-z])\1/g, '!');

В результате в переменную запишется следующее:

'! ! cd ef'

### Пример
Пусть у нас есть вот такая строка:

let str = 'asxca buzxb csgd';

Давайте найдем в ней все слова, в которых одинаковы первая и последняя буквы. Для решения задачи напишем следующий шаблон: буква, затем еще одна или более букв, а затем такая же буква как первая:

let res = str.replace(/([a-z])[a-z]+\1/g, '!');

В результате в переменную запишется следующее:

'! ! csgd'

## Несохраняющие скобки в регулярках JavaScript

Скобки ( ) выполняют две функции - группировка символов и функцию кармана. А что делать, если нам нужно сгруппировать, но в карман не класть?

Для решения такой проблемы придуманы специальные несохраняющие скобки (?: ) - они группируют, но не кладут в карман.

### Пример
В следующем примере первые скобки нам нужны для группировки, а вторые - для кармана. Однако, и те, и другие скобки сохраняют данные в карман:

let str = 'abab123';

let res = str.match(/(ab)+([1-9]+)/);

В результате в наших карманах будет следующее:

console.log(res[0]); // выведет 'abab123'

console.log(res[1]); // выведет 'ab'

console.log(res[2]); // выведет '123'

### Пример
Сделаем так, чтобы первая пара скобок только группировала, но не клала в карман:

let str = 'abab123';

let res = str.match(/(?:ab)+([1-9]+)/);

В результате в первом кармане будет наше число:

console.log(res[1]); // выведет '123'

## Позитивный и негативный просмотр в JavaScript

Иногда нужно решить задачу такого типа: найти строку 'aaa' и заменить ее на '!', но только если после 'aaa' стоит 'x', а сам 'x' при этом не заменять. Если мы попытаемся решить задачу 'в лоб', то у нас ничего не выйдет:

'aaax baaa'.replace(/aaax/g, '!'); // вернет '! baaa', а хотели '!x baaa'

### Позитивный просмотр вперед
Для решения задачи нужен способ сказать, что 'x' не следует заменять. Делается это с помощью специальных скобок (?= ), которые просто смотрят, но не забирают с собой.

Эти скобки называются позитивный просмотр вперед. Позитивный - так как 'x' (в нашем случае) должен быть - только тогда произойдет замена.

Давайте применим эти скобки для решения нашей задачи:

'aaax aaab'.replace(/aaa(?=x)/g, '!'); // вернет '!x aaab'

### Негативный просмотр вперед
Есть и негативный просмотр вперед - (?! ) - он, наоборот, говорит, что чего-то должно не быть:

// Если после 'aaa' стоит НЕ 'x', тогда заменим на '!':

'aaax aaab'.replace(/aaa(?!x)/g, '!'); // вернет 'aaax !b'

### Просмотр назад

Во многих языках программирования существует также просмотр назад. К сожалению, в JavaScript пока нет такой опции (но возможно в будущем появится).

## Коллбэк в методе replace в регулярках JavaScript

Метод replace вторым параметром может принимать не только строку, но и функцию-коллбэк, которая применится для каждого найденного совпадения. Каждая подстрока, которую нашла регулярка, заменится на то, что вернет эта функция именно для этой подстроки.

В эту функцию можно передавать параметры: в первый параметр положится найденная строка, во второй параметр - первый карман, в третий параметр - второй карман и так далее - можно делать сколько параметров, сколько карманов в регулярном выражении.

В предпоследний параметр положится позиция найденного совпадения, а в последний - вся строка, по которой делается поиск.

Как это все работает - разберем на практических примерах.

### Пример
Пусть дана строка с числами:

let str = '2 3 4 5';

Давайте заменим эти числа на их квадраты. Для начала давайте просто выведем наши числа по очереди в консоль в функции-коллбэке:

str.replace(/\d+/g, function(match) {
console.log(match);
});

Наш код выведет сначала '2', потом '3', '4' и '5'. То есть в переменную match последовательно попадают те строки, которые нашла регулярка.

Давайте решим задачу до конца - будем возводить match в квадрат и возвращать его с помощью return. Получится, что для найденной двойки вернется 4 и двойка заменится на эту четверку, для найденной тройки вернется 9 и тройка заменится на эту девятку - и так далее:

let result = str.replace(/\d+/g, function (match) {
return match**2;
});

console.log(result); // выведет '4 9 16 25'

### Пример
Пусть теперь в строке даны конструкции вида '2+3=':

let str = '2+3= 4+5= 6+7=';

Давайте сделаем так, чтобы после равно вставились суммы соответствующих чисел. То есть наша строка должна превратиться в следующую:

'2+3=5 4+5=9 6+7=13'

Для решения задачи давайте опять поэкспериментируем - разложим первое и второе слагаемые по отдельным карманам:

str.replace(/(\d+)\+(\d+)=/g, function (match0, match1, match2) {
console.log(match0, match1, match2);
});

А теперь окончательно решим задачу: для каждой найденной подстроки просуммируем первый и второй карманы, возьмем нулевой карман (найденную строку, например '2+3='), добавим к нему результат и вернем все это через return:

let result = str.replace(/(\d+)\+(\d+)=/g, function(match0, match1, match2) {
let sum = Number(match1) + Number(match2);
return match0 + sum;
});

console.log(result);

## Метод search в регулярных выражениях JavaScript

В данном уроке мы с вами разберем метод search, который осуществляет поиск в строке по регулярному выражению. **Он принимает следующие параметры: строка.search(регулярка), а возвращает позицию первой найденной подстроки, а если она не найдена - то -1**.

В следующем примере мы находим позицию подстроки 'aaa' в нашей строке:

let str = 'a aa aaa aaaa aaaa';

let res = str.search(/aaa/);

В результате в переменную запишется следующее:

5

## Метод split в регулярных выражениях JavaScript

В данном уроке мы с вами разберем метод split, который уже хорошо вам знаком - он разбивает строку в массив по разделителю. Вы уже должны знать, что разделитель передается параметром и им является строка.

Это однако не всегда так - **параметром можно передать и регулярное выражение. В этом случае разделителем будет выступать все подстроки, которые попали под регулярное выражение.**

В следующем примере мы разобьем строку в массив по разделителю '-' или по разделителю '+':

let str = 'a-b+c-d+e';

let res = str.split(/[-+]/);

В результате в переменную запишется следующее:

['a', 'b', 'c', 'd', 'e']