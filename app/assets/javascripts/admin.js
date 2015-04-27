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
            var standardsForm = $(this).parent().parent();


            standardsForm.find('.standardsError').children().remove();
            $('.questionStandard').css('border-color','#cccccc');
            $('#standardName').css('border-color','#cccccc');
            var error = null;
            var array = [];
            var questionStandards = $(this).parent().parent().find('.questionStandard');
            questionStandards.each(function(){
                var questionId = $(this).data('question-id');
                var value = $(this).val();
                if (isNaN(parseInt(value))){
                    $(this).css('border-color','red');
                    error = true;
                }
                array.push(questionId+':'+value);
            });
//            $('.questionStandard').each(function(){
//                var questionId = $(this).data('question-id');
//                var value = $(this).val();
//                if (isNaN(parseInt(value))){
//                    $(this).css('border-color','red');
//                    error = true;
//                }
//                array.push(questionId+':'+value);
//            });
            if (error) {
                standardsForm.find('.standardsError').prepend('<h4>Please use only numbers.</h4>');
            } else {
                if (!$('#standardName').val()) {
                    standardsForm.find('.standardsError').prepend('<h4>Please give this set a name.</h4>');
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
        $('.updateStandards').on('click',function(e){
            e.preventDefault();
            e.stopPropagation();

            var standardsForm = $(this).parent().parent();
            standardsForm.find('.standardsError').children().remove();
            $('.questionStandard').css('border-color','#cccccc');
            $('#standardName').css('border-color','#cccccc');
            var error = null;
            var array = [];
            var questionStandards = $(this).parent().parent().find('.questionStandard');
            questionStandards.each(function(){
                var questionId = $(this).data('question-id');
                var value = $(this).val();
                if (isNaN(parseInt(value))){
                    $(this).css('border-color','red');
                    error = true;
                }
                array.push(questionId+':'+value);
            });
            if (error) {
                standardsForm.find('.standardsError').prepend('<h4>Please use only numbers.</h4>');
            } else {
                if (!$('#standardName').val()) {
                    standardsForm.find('.standardsError').prepend('<h4>Please give this set a name.</h4>');
                    $('#standardName').css('border-color','red');

                } else {
                    console.log(array.join('|'));
                    console.log($('#standardName').val());
                    $.ajax({
                        type: "PUT",
                        url: "/standards/"+$(this).parent().parent().data('standard-id'),
                        data: {
                            id: standardsForm.data('standard-id'),
                            name: standardsForm.find('.standardName').val(),
                            details: array.join('|')
                        }
                    });
                    location.reload();
                }
            }
        });
    }
};