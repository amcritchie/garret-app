var Admin = {
    load: function() {

        List.listeners("Keys", "keys");
        List.listeners("Departments", "departments");

        $('.deleteQuestion').on('click', function () {
            $.ajax({
                type: "POST",
                url: "/questions/destroy",
                data: {id: $(this).data('question-id')}
            });
            $(this).parent().parent().remove();
        });

        $('.approveApplication').on('click', function () {
            var id = $(this).data('application-id');
            $.ajax({
                type: "POST",
                url: "application/approve",
                data: {id: id}
            });
            var a = $(this).parent();
            $(this).parent().children('button').remove();
            a.prepend('Approved');
        });

        $('.denyApplication').on('click', function () {
            var id = $(this).data('application-id');
            $.ajax({
                type: "POST",
                url: "application/deny",
                data: {id: id}
            });
            var a = $(this).parent();
            $(this).parent().children('button').remove();
            a.prepend('Decided');
        });

        $('#saveStandards').on('click',function(e){
            e.preventDefault();
            e.stopPropagation();

            $('.standardsError').children().remove();
            $('.questionStandard').css('border-color','#cccccc');
            $('#standardName').css('border-color','#cccccc');
            var error = null;
            var array = [];
            $('.questionStandard').each(function(){
                var questionId = $(this).data('question-id');
                var value = $(this).val();
                if (isNaN(parseInt(value))){
                    $(this).css('border-color','red');
                    error = true;
                }
                array.push(questionId+':'+value);
            });
            if (error) {
                $('.standardsError').prepend('<h4>Please use only numbers.</h4>');
            } else {
                if (!$('#standardName').val()) {
                    $('.standardsError').prepend('<h4>Please give this set a name.</h4>');
                    $('#standardName').css('border-color','red');

                } else {
                    console.log(array.join('|'));
                    console.log($('#standardName').val());
                    $.ajax({
                        type: "POST",
                        url: "/standards",
                        data: {
                            name: $('#standardName').val(),
                            details: array.join('|')
                        }
                    });
                    location.reload();
                }
            }
        });
    }
};