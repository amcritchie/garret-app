var DepartmentDescriptions = {
    load: function (descriptions) {
        if (descriptions) {
            descriptions.split('|Θ').forEach(function (description) {
                if (description) {
                    var id = description.split('Æχ')[0];
                    var value = description.split('Æχ')[1];
                    $('.departmentDescription[data-description-id=' + id + ']').val(value);
                }
            });
        }
    },
    save: function () {
        var array = [];
        $('.departmentDescription[data-relevant=true]').each(function (index, question) {
            var id = $(question).attr('data-description-id');
            var value = $(question).val();
            array.push(id + 'Æχ' + value);
        });
        return array.join('|Θ')
    }
};