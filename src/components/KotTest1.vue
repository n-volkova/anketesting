<template>
    <div class="kot-test">

        <kot-question
            id="0"
            title="1. Одиннадцатый месяц года – это:"
            :options="['октябрь', 'май', 'ноябрь', 'февраль']"
            correct="ноябрь" />

        <kot-question
            id="1"
            title="2. «Суровый» является противоположным по значению слову:"
            :options="['резкий', 'строгий', 'мягкий', 'жесткий', 'неподатливый']"
            correct="мягкий" />

        <kot-question
            id="2"
            title="3. Какое из приведенных ниже слов отлично от других:"
            :options="['определенный', 'сомнительный', 'уверенный', 'доверие', 'верный']"
            correct="сомнительный" />

        <kot-question
            id="3"
            title="4. Верно ли то, что сокращение «н.э.» означает: «нашей эры» («новой эры»)?"
            :options="['да', 'нет']"
            correct="да" />

        <kot-question
            id="4"
            title="5. Какое из следующих слов отлично от других?"
            :options="['петь', 'звонить', 'болтать', 'слушать', 'говорить']"
            correct="слушать" />

        <kot-question
            id="5"
            title="6. Слово «безукоризненный» является противоположным по своему значению слову:"
            :options="['незапятнанный', 'непристойный', 'неподкупный', 'невинный', 'классический']"
            correct="непристойный" />

        <kot-question
            id="6"
            title="7. Какое из приведенных ниже слов относится к слову «жевать» как «обоняние» к «нос»?"
            :options="['сладкий', 'язык','запах','зубы','чистый']"
            correct="зубы" />

        <kot-question
            id="7"
            title="8. Сколько из приведенных ниже пар слов являются полностью идентичными?"
            :options="['1', '2', '3', '4', '5', '0']"
            correct="1">
            <template v-slot:text>
                <div class="align-center">
                    <div class="text-slot align-right">
                        Sharp M.C. <br>
                        Filder E.H. <br>
                        Connor M.G. <br>
                        Woesner O.W. <br>
                        Soderquist P.E.
                    </div>
                    <div class="text-slot align-left">
                        Sharp M.C. <br>
                        Filder E.N. <br>
                        Conner M.G. <br>
                        Woerner O.W. <br>
                        Soderquist B.E.
                    </div>
                </div>
            </template>
        </kot-question>

        <kot-question
            id="8"
            title="9. «Ясный» является противоположным по смыслу слову:"
            :options="['очевидный', 'явный', 'недвусмысленный', 'отчетливый', 'тусклый']"
            correct="тусклый" />

        <kot-question
            id="9"
            title="10. Предприниматель купил несколько подержанных автомобилей за 3500 долларов, а продал их за 5500 долларов, заработав на этом 50 долларов за автомобиль. Сколько автомобилей он продал?"
            correct="40" />

        <kot-question
            id="10"
            title="11. Слова «стук» и «сток» имеют:"
            :options="['сходное значение', 'противоположное', 'ни сходное, ни противоположное']"
            correct="ни сходное, ни противоположное" />

        <kot-question
            id="11"
            title="12. Три лимона стоят 45 копеек. Сколько (в копейках) стоит 1,5 дюжины?"
            :correct="['270', '2.7', '2,7']" />

        <kot-question
            id="12"
            title="13. Сколько из этих шести пар чисел являются полностью одинаковыми?"
            :options="['1', '2', '3', '4', '5', '6', '0']"
            correct="4">
            <template v-slot:text>
                <div class="align-center">
                    <div class="text-slot align-right">
                        5296 <br>
                        66986 <br>
                        834426 <br>
                        7354256 <br>
                        83238224
                    </div>
                    <div class="text-slot align-left">
                        5296 <br>
                        69686 <br>
                        834426 <br>
                        7354256 <br>
                        611977172
                    </div>
                </div>
            </template>
        </kot-question>

        <kot-question
            id="13"
            title="14. «Близкий» является противоположным по значению слову:"
            :options="['дружеский', 'приятельский', 'чужой', 'родной', 'иной']"
            correct="чужой" />
        <kot-question
            id="14"
            title="15. Какое число является наименьшим?"
            :options="['6', '0,7', '9', '36', '0.31', '5']"
            correct="0.31" />

        <kot-question
            id="15"
            title="16. Расставьте предлагаемые ниже слова в таком порядке, чтобы получилось правильное предложение. В качестве ответа выберите последнее слово получившегося предложения."
            :options="['есть', 'соль', 'любовь', 'жизни']"
            correct="жизни" />

        <kot-question
            id="16"
            title="17. Какой из приведенных ниже пяти рисунков наиболее отличен от других?"
            :options="['1', '2', '3', '4', '5']"
            correct="4">
            <template v-slot:image>
                <div class="image-slot image-17"></div>
            </template>
        </kot-question>

        <kot-question
            id="17"
            title="18. Два рыбака поймали 36 рыб. Первый поймал в 8 раз больше, чем второй. Сколько поймал второй?"
            correct="4" />
        
        <kot-question
            id="18"
            title="19. «Восходить» и «возродить» имеют:"
            :options="['сходное значение', 'противоположное', 'ни сходное, ни противоположное']"
            correct="ни сходное, ни противоположное" />

        <kot-question
            id="19"
            title="20. Расставьте предлагаемые ниже слова в таком порядке, чтобы получилось утверждение."
            :options="['правильно', 'неправильно']"
            correct="неправильно" >
            <template v-slot:text>
                <div class="text-slot">
                    мхом обороты камень набирает заросший
                </div>
            </template>
            <template v-slot:title>
                <div class="text-slot question-title">Правильно ли это утверждение?</div>
            </template>
        </kot-question>

        <kot-question
            id="20"
            title="21. Две из приведенных ниже фраз имеют одинаковый смысл, найдите их."
            :options="['Держать нос по ветру', 'Пустой мешок не стоит', 'Трое докторов не лучше одного', 'Не все то золото, что блестит', 'У семи нянек дитя без глаза']"
            :correct="['Трое докторов не лучше одного', 'У семи нянек дитя без глаза']"
            multiple
            max="2" />

        <kot-question
            id="21"
            title="22. Какое число должно стоять вместо знака «?»:"
            correct="31">
            <template v-slot:text>
                <div class="text-slot">
                    73&emsp;66&emsp;59&emsp;52&emsp;45&emsp;38&emsp;?
                </div>
            </template>
        </kot-question>

        <kot-question
            id="22"
            title="23. Длительность дня и ночи в сентябре почти такая же, как и в:"
            :options="['июне', 'марте', 'мае', 'ноябре']"
            correct="марте" />

        <kot-question
            id="23"
            title="24. Предположим, что первые два утверждения верны:"
            :options="['верно', 'неверно', 'неопределенно']"
            correct="верно">
            <template v-slot:text>
                <div class="text-slot">
                    A. Все передовые люди – члены партии.<br>
                    Б. Все передовые люди занимают крупные посты.<br>
                    B. Некоторые члены партии занимают крупные посты.
                </div>
            </template>
            <template v-slot:title>
                <div class="text-slot question-title">Тогда заключительное будет:</div>
            </template>
        </kot-question>

        <kot-question
            id="24"
            title="25. Поезд проходит 75 см за ¼ секунды. Если он будет ехать с той же скоростью, то какое расстояние (в сантиметрах) он пройдет за 5 секунд?"
            :correct="['1500', '15']" />

        <kot-question
            id="25"
            title="26. Предположим, что первые два утверждения верны:"
            :options="['верно', 'неверно', 'неопределенно']"
            correct="верно">
            <template v-slot:text>
                <div class="text-slot">
                    A. Боре столько же лет, сколько Маше.<br>
                    Б. Маша моложе Жени.<br>
                    B. Боря моложе Жени.
                </div>
            </template>
            <template v-slot:title>
                <div class="text-slot question-title">Тогда последнее будет:</div>
            </template>
        </kot-question>

        <kot-question
            id="26"
            title="27. Пять полукилограммовых пачек мясного фарша стоят 2 рубля. Сколько килограммов фарша можно купить за 80 копеек?"
            correct="1" />

        <kot-question
            id="27"
            title="28. «Расстилать» и «растянуть». Эти слова:"
            :options="['схожи по смыслу', 'противоположны', 'ни схожи, ни противоположны']"
            correct="схожи по смыслу" />

        <kot-question
            id="28"
            title="29. Разделите эту геометрическую фигуру прямой линией на две части так, чтобы, сложив их вместе, можно было получить квадрат. В качестве ответа выберите номера двух соединяемых точек, без разделителя."
            :options="['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']"
            :correct="['13', '2']"
            multiple
            max="2">
            <template v-slot:image>   
                <div class="image-slot image-29"></div>
            </template>
        </kot-question>

        <kot-question
            id="29"
            title="30. Предположим, что первые два утверждения верны:"
            :options="['верно', 'неверно', 'неопределенно']"
            correct="неопределенно">
            <template v-slot:text>
                <div class="text-slot">
                    A. Саша поздоровался с Машей.<br>
                    Б. Маша поздоровалась с Дашей.<br>
                    B. Саша не поздоровался с Дашей.
                </div>
            </template>
            <template v-slot:title>
                <div class="text-slot question-title">Тогда последнее будет:</div>
            </template>
        </kot-question>

        <kot-question
            id="30"
            title="31. Автомобиль стоимостью 2400 рублей, был уценен во время сезонной распродажи на 33 ⅓ %. Сколько стоил автомобиль во время распродажи?"
            correct="1600" />

        <kot-question
            id="31"
            title="32. Три из пяти фигур нужно соединить таким образом, чтобы получилась равнобедренная трапеция:"
            :options="['1', '2', '3', '4', '5']"
            :correct="['1', '2', '4']"
            multiple
            max="3">
            <template v-slot:image>   
                <div class="image-slot image-32"></div>
            </template>
        </kot-question>

        <kot-question
            id="32"
            title="33. На платье требуется 2 ⅓ м. ткани. Сколько платьев можно сшить из 42 м?"
            correct="18" />

        <kot-question
            id="33"
            title="34. Значения следующих двух предложений:"
            :options="['сходны', 'противоположны', 'ни сходны, ни противоположны']"
            correct="ни сходны, ни противоположны">
            <template v-slot:text>
                <div class="text-slot">
                    A. Трое докторов не лучше одного.<br>
                    Б. Чем больше докторов, тем больше болезней.
                </div>
            </template>
        </kot-question>

        <kot-question
            id="34"
            title="35. «Увеличивать» и «расширять». Эти слова:"
            :options="['сходны', 'противоположны', 'ни сходны, ни противоположны']"
            correct="сходны" />

        <kot-question
            id="35"
            title="36. Смысл двух английских пословиц:"
            :options="['схож', 'противоположен', 'ни схож, ни противоположен']"
            correct="схож" >
            <template v-slot:text>
                <div class="text-slot">
                    A. Швартоваться лучше двумя якорями.<br>
                    Б. Не клади все яйца в одну корзину.
                </div>
            </template>
        </kot-question>

        <kot-question
            id="36"
            title="37. Бакалейщик купил ящик с апельсинами за 36 рублей. В ящике их было 12 дюжин. Он знает, что 2 дюжины испортятся еще до того, как он продаст все апельсины. По какой цене за дюжину (в копейках) ему нужно продавать апельсины, чтобы получить прибыль в ⅓ закупочной цены?"
            :correct="['4.8', '4,8']" />

        <kot-question
            id="37"
            title="38. «Претензия» и «претенциозный». Эти слова по своему значению:"
            :options="['сходны', 'противоположны', 'ни сходны, ни противоположны']"
            correct="сходны" />

        <kot-question
            id="38"
            title="39. Если бы полкило картошки стоило 0,0125 рублей, то сколько килограммов можно было бы купить за 50 копеек?"
            correct="20" />

        <kot-question
            id="39"
            title="40. Один из членов ряда не подходит к другим. Каким числом вы бы его заменили?"
            correct="1/8">
            <template v-slot:text>
                <div class="text-slot">
                    1/4&emsp;1/8&emsp;1/8&emsp;1/4&emsp;1/8&emsp;1/8&emsp;1/4&emsp;1/8&emsp;1/6
                </div>
            </template>
        </kot-question>

        <kot-question
            id="40"
            title="41. «Отражаемый» и «воображаемый». Эти слова являются:"
            :options="['сходными', 'противоположными', 'ни сходными, ни противоположными']"
            correct="ни сходными, ни противоположными" />

        <kot-question
            id="41"
            title="42. Сколько соток составляет участок 70 м на 20 м?"
            correct="14" />

        <kot-question
            id="42"
            title="43. Следующие две фразы по значению:"
            :options="['сходны', 'противоположны', 'ни сходны, ни противоположны']"
            correct="сходны">
            <template v-slot:text>
                <div class="text-slot">
                    А. Хорошие вещи дешевы, плохие дороги.<br>
                    Б. Хорошее качество обеспечивается простотой, плохое – сложностью.
                </div>
            </template>
        </kot-question>

        <kot-question
            id="43"
            title="44. Солдат, стреляя в цель, поразил ее в 12,5 % случаев. Сколько раз солдат должен выстрелить, чтобы поразить ее сто раз?"
            correct="800" />

        <kot-question
            id="44"
            title="45. Один из членов ряда не подходит к другим. Каким числом вы бы его заменили?"
            correct="1/10">
            <template v-slot:text>
                <div class="text-slot">
                    1/4&emsp;1/6&emsp;1/8&emsp;1/9&emsp;1/12&emsp;1/14
                </div>
            </template>
        </kot-question>

        <kot-question
            id="45"
            title="46. Три партнера по акционерному обществу решили поделить прибыль поровну. Т. вложил в дело 4500 руб, К. – 3500 руб, П. – 2000 руб. Если прибыль составит 2400 руб, то насколько меньше прибыль получит Т. по сравнению с тем, как если бы прибыль была разделена пропорционально вкладам?"
            correct="280" />

        <kot-question
            id="46"
            title="47. Какие две из приведенных ниже пословиц имеют сходный смысл:"
            :options="['Куй железо, пока горячо', 'Один в поле не воин', 'Лес рубят – щепки летят', 'Не все то золото, что блестит', 'Не по виду суди, а по делам гляди']"
            :correct="['Не все то золото, что блестит', 'Не по виду суди, а по делам гляди']"
            multiple
            max="2" />

        <kot-question
            id="47"
            title="48. Значение следующих фраз:"
            :options="['сходно', 'противоположно', 'ни сходно, ни противоположно']"
            correct="сходно">
            <template v-slot:text>
                <div class="text-slot">
                    A. Лес рубят – щепки летят.<br>
                    Б. Большое дело не бывает без потерь.
                </div>
            </template>
        </kot-question>

        <kot-question
            id="48"
            title="49. Какая из этих фигур наиболее отлична от других?"
            :options="['1', '2', '3', '4', '5']"
            correct="3">
            <template v-slot:image>   
                <div class="image-slot image-49"></div>
            </template>
        </kot-question>

        <kot-question
            id="49"
            title="50. В печатающейся статье 24 000 слов. Редактор решил использовать шрифт двух размеров. При использовании шрифта большого размера на странице умещается 900 слов, меньшего – 1200. Статья должна занять 21 полную страницу в журнале. Сколько страниц должно быть напечатано мелким шрифтом?"
            correct="17" />
        
    </div>
</template>

<script>
    import KotQuestion from './KotQuestion'

    export default {
        components: {
            KotQuestion
        },
    }
</script>

<style lang="scss" scoped>
    .kot-test {
        user-select: none;
    }
    .align-center {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        @media (max-width: 600px) {
            justify-content: space-evenly;
        }
    }
    .text-slot {
        margin-bottom: 20px;
        color: #666;
        font-size: 18px;
        line-height: 1.6;
        &.question-title {
            font-size: 17px;
            color: #000;
        }
        &.align-left {
            text-align: left;
        }
        &.align-right {
            margin-right: 20px;
            text-align: right;
            @media (max-width: 600px) {
                margin-right: 0;
            }
        }
    }
    .image-slot {
        margin-bottom: 30px;
        background-repeat: no-repeat;
        background-size: contain;
        &.image-17 {
            height: 103px; 
            background-image: url('~@/assets/kotA-17.png');
        }
        &.image-29 {
            height: 248px; 
            background-image: url('~@/assets/kotA-29.png');
        }
        &.image-32 {
            height: 93px; 
            background-image: url('~@/assets/kotA-32.png');
        }
        &.image-49 {
            height: 85px; 
            background-image: url('~@/assets/kotA-49.png');
        }
    }
</style>