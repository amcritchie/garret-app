var Inputs = {
    question: function () {
        return [
            {name: 'body', validates: ['presence']}
        ]
    },
    evaluation: function () {
        return [
            {name: 'name', validates: ['presence']}
        ]

    },
    restaurant: function () {
        return [
            {name: 'name', validates: ['presence']},
            {name: 'url', validates: ['presence']},
            {name: 'phone_number', validates: ['phone', 'presence']},
            {name: 'email', validates: ['email', 'presence']},
            {name: 'password', validates: ['password', 'presence']},
            {name: 'address', validates: ['presence'], inputSelector: ['#restaurant_address', '#restaurant_city', '#restaurant_state', '#restaurant_zip']},
        ]
    },
    signUp: function () {
        return [
            {name: 'name', validates: ['presence'], inputSelector: ['#user_first_name', '#user_last_name']},
            {name: 'email', validates: ['email', 'presence']},
            // {name: 'skype', validates: ['presence']},
            {name: 'password', validates: ['password', 'presence']},
            {name: 'phone_number', validates: ['phone', 'presence']},
            {name: 'address', validates: ['presence'], inputSelector: ['#user_address', '#user_city', '#user_state', '#user_zip']},
//            {name: 'devices', validates: ['checkbox']},
            {name: 'found_us_by', validates: ['presence']},
            {name: 'qualifications', validates: ['presence']},
            {name: 'availability', validates: ['radio']},
            {name: 'other_locations', validates: ['presence']},
//            {name: 'interested_in', validates: ['checkbox']},
            {name: 'work_with_other_companies', validates: ['radio']},
            {name: 'certification', validates: ['presence']},
//            {name: 'writing', validates: ['radio']},
            {name: 'writing', validates: ['presence']},
            {name: 'good_time', validates: ['presence']},
//            {name: 'trends', validates: ['presence']},
            {name: 'favorite_restaurant', validates: ['presence']},
            {name: 'favorite_restaurant_why', validates: ['presence']},
//            {name: 'ten_and_five', validates: ['presence']},
            {name: 'restaurant_experience', validates: ['presence']},
            {name: 'literacy', validates: ['presence']},
            {name: 'no_name_scenario', validates: ['presence']},
            {name: 'birthday', validates: ['presence']},
            {name: 'gender', validates: ['radio']},
            {name: 'occupation', validates: ['presence']},
            {name: 'employment', validates: ['radio']},
            {name: 'education', validates: ['radio']}
        ];
    }
};
