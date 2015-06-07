var RestaurantDetails = {
    load: function (details) {
        $(document.getElementById("arrival_time")).val(details.arrive_time);
        $(document.getElementById("departure_time")).val(details.depart_time);

        if (details.check_all_items_billed) { document.getElementById("all_items").click(); }
        $(document.getElementById("check_id")).val(details.check_num);
        $(document.getElementById("table_id")).val(details.table_num);
        $(document.getElementById("check_amount")).val(details.check_amount);

        if (details.res_valid) { document.getElementById("no_res").click()}
        $('[name=res_gender][value=' + details.res_gender + ']').click();
        $(document.getElementById("res_name")).val(details.res_name);
        $(document.getElementById("res_time")).val(details.res_other);

        RestaurantDetails.loadEmployee('ser',details);
        RestaurantDetails.loadEmployee('bar',details);
        RestaurantDetails.loadEmployee('ho1',details);
        RestaurantDetails.loadEmployee('ho2',details);
        RestaurantDetails.loadEmployee('man',details);
        RestaurantDetails.loadEmployee('ser',details);
    },
    loadEmployee: function(code, details) {
        if (details[code + '_valid']) {
            document.getElementById(code +'_ser').click()
        }
        $('[name=' + code + '_gender][value=' + details[code + '_gender'] + ']').click();
        $(document.getElementById(code +'_height')).val(details[code + '_height']);
        $(document.getElementById(code +'_other')).val(details[code + '_other']);
    },
    save: function() {
        return {
            time_spots: {
                arrival_time: document.getElementById("arrival_time").value,
                departure_time: document.getElementById("departure_time").value
            },
            check: {
                allItems: document.getElementById("all_items").checked,
                check: document.getElementById("check_id").value,
                table: document.getElementById("table_id").value,
                checkAmount: document.getElementById("check_amount").value
            },
            employees: {
                reservationist: {
                    valid: document.getElementById("no_res").checked,
                    gender: $("input[name=res_gender]:checked").val(),
                    name: document.getElementById("res_name").value,
                    other: document.getElementById("res_time").value
                },
                host1: RestaurantDetails.saveEmployee('ho1'),
                host2: RestaurantDetails.saveEmployee('ho2'),
                server: RestaurantDetails.saveEmployee('ser'),
                manager: RestaurantDetails.saveEmployee('man'),
                bartender: RestaurantDetails.saveEmployee('bar')
            }
        }
    },
    saveEmployee: function(code){
        return {
            valid: document.getElementById('no_' + code).checked,
            gender: $('input[name=' + code + '_gender]:checked').val(),
            height: document.getElementById(code + '_height').value,
            other: document.getElementById(code + '_other').value
        }
    },
    setDisableEvents: function () {
        $('#no_bar').on('click', function () {
            Evaluation.disableEmployee(this, 'bar');
        });
        $('#no_ho1').on('click', function () {
            Evaluation.disableEmployee(this, 'ho1');
        });
        $('#no_ho2').on('click', function () {
            Evaluation.disableEmployee(this, 'ho2');
        });
        $('#no_man').on('click', function () {
            Evaluation.disableEmployee(this, 'man');
        });
        $('#no_ser').on('click', function () {
            Evaluation.disableEmployee(this, 'ser');
        });
        $('#no_res').on('click', function () {
            if ($(this).prop("checked")) {
                $('#res_name').prop('disabled', true).val('');
                $('#res_time').prop('disabled', true).val('');
                $('[name=res_gender]').prop('disabled', true).prop('checked', false);
            } else {
                $('#res_name').prop('disabled', false);
                $('#res_time').prop('disabled', false);
                $('[name=res_gender]').prop('disabled', false);
            }
        });
    },

    disableEmployee: function (box, key) {
        if ($(box).prop("checked")) {
            $('#' + key + '_hair').prop('disabled', true).val('');
            $('#' + key + '_height').prop('disabled', true).val('');
            $('#' + key + '_other').prop('disabled', true).val('');
            $('[name=' + key + '_gender]').prop('disabled', true).prop('checked', false);
        } else {
            $('#' + key + '_hair').prop('disabled', false);
            $('#' + key + '_height').prop('disabled', false);
            $('#' + key + '_other').prop('disabled', false);
            $('[name=' + key + '_gender]').prop('disabled', false);
        }
    }
};