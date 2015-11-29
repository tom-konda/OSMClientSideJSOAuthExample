(
    function(){
        'use strict';
        $(
            function (event) {
                var auth = new osmAuth(
                    {
                        // url : 'http://api06.dev.openstreetmap.org',
                        oauth_consumer_key: '6xjntOLBBDWm8VoBVzI8WvkBRC77xHQyroCD5yBV',
                        oauth_secret: 'RUN39yYiNHfrQZ47pKErrYxwN2erhh7Z3VzOlMkW',
                        auto: true
                    }
                );
                
                $('#get-user-data').on(
                    'click',
                    function (event) {
                        auth.xhr(
                            {
                                method: 'GET',
                                path: '/api/0.6/user/details'
                            },
                            function (error, result) {
                                $('#result').empty();
                                var userData = result.querySelector('osm > user');
                                $('#result').append('<div>ユーザID:'+userData.getAttribute('id')+'</div>');
                                $('#result').append('<div>表示名:'+userData.getAttribute('display_name')+'</div>');
                                $('#result').append('<div>作成日:'+userData.getAttribute('account_created')+'</div>');
                                $('#result').append('<div>優先言語の数:'+userData.querySelectorAll('languages > lang').length+'</div>');
                            }
                        )
                    }
                );
                
                $('#logout').on(
                    'click',
                    function (event) {
                        auth.logout();
                    }
                );
            }
        );
    }
)();