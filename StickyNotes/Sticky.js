$(function () {
    var template =
        `<div class="window">
    <nav class="top_nav">
        <a href="#" class="add"><i class="fa fa-plus"></i></a>
        <a href="#" class="save"><i class="fa fa-floppy-disk"></i></a>
        <div class="right">
            <a href="#" class="get"><i class="fa fa-list"></i></a>
            <a href="#" class="close"><i class="fa fa-times"></i></a>
        </div>
    </nav>
    <textarea name="text_box" class="text_box"></textarea>
    <nav class="side_nav"><ol></ol></nav>
</div>
`;
    $('#wrapper').append(template);

    var notes = {
        add: function () {
            var x_bound = $('#wrapper').width() - 250;
            var y_bound = $('#wrapper').width() - 300;
            var x = Math.random() * x_bound;
            var y = Math.random() * y_bound;

            $('#wrapper').append(template);
            var new_note = $('.window').last();

            new_note.css({
                left: parseInt(x) + 'px',
                top: parseInt(y) + 'px',
                opacity: 1
            });

            $('.window').css('zIndex', '0');
            new_note.css('zIndex', '99');
        },
        // current_note: textarea element
        save: function (current_note) {
            var text = current_note.val();
            if (text !== '') {
                var key = prompt('파일 이름?');
                localStorage.setItem(key, text);
            }
        },

        get: function list_storage(side_nav) {
            var del_icon = `<i class="fa fa-trash"></i>`;
            
            side_nav.find('ol').empty();
            side_nav.toggleClass('on');

            Object.keys(localStorage).forEach(function(key){
                side_nav.find('ol').append(`<li>${key}${del_icon}</li>`)
             });

            side_nav.find('li').click(function() {
                var key = $(this).text();
                var text = localStorage.getItem(key);
                side_nav.prev('.text_box').val(text);
            });

            side_nav.find('li > i').click(function() {
                var key = $(this).parent().text();
                var ok = confirm('삭제?');
                if(ok) {
                    localStorage.removeItem(key);
                }
            });
        }

    };

    // 고차함수로 리팩터링 가능할 듯
    $('#wrapper').on('click', '.add', function () {
        notes.add();
    });

    $('#wrapper').on('click', '.save', function () {
        var cur_note = $(this).parent().siblings('.text_box');
        notes.save(cur_note);
    });

    $('#wrapper').on('click', '.get', function () {
        var cur_side_bar = $(this).parents('.top_nav').siblings('.side_nav');
        notes.get(cur_side_bar);
    });

    $('#wrapper').on('click', '.close', function () {
        $(this).parents('.window').remove();
    });

    $('#wrapper').on('mouseover', '.top_nav', function() {
        $(this).parent().draggable();
    });
});




/* JS version
let template =
`<div class="window">
    <nav class="top_nav">
        <a href="#" class="add"><i class="fa fa-plus"></i></a>
        <a href="#" class="save"><i class="fa fa-floppy-disk"></i></a>
        <div class="right">
            <a href="#" class="get"><i class="fa fa-list"></i></a>
            <a href="#" class="delete"><i class="fa fa-times"></i></a>
        </div>
    </nav>
    <textarea name="text_box"></textarea>
    <nav class="side_nav"><ol></ol></nav>
</div>
`;

document.getElementsByClassName('wrapper')[0].innerHTML = template;
*/