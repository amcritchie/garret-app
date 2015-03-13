var List = {
    listeners: function (cap, reg) {
        $('.add' + cap).on('click', function () {
            var bodyVal = $('#body' + cap).val();
            $.ajax({
                type: "POST",
                url: "/" + reg,
                data: {name: bodyVal}
            });
            $('#list' + cap).append(
                    '<tr> <div class="user-row" data-department-id="<%= question.id %>">' +
                    '<th></th> <th><strong>' + bodyVal + '</strong> </th> </div> </tr>'
            );
        });

        $('.delete' + cap).on('click', function () {
            $.ajax({
                type: "DELETE",
                url: "/" + reg + "/" + $(this).data(reg + '-id')
            });
            $(this).parent().parent().remove();
        });
    }
};