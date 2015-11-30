(
    function(){
        'use strict';
        $(
            function (event) {
                var auth, oauth_token;
                
                // ここから singlepage が true の時のみ必要
                function stringQs(str) {
                    return str.split('&').filter(function (pair) {
                        return pair !== '';
                    }).reduce(function(obj, pair){
                        var parts = pair.split('=');
                        obj[decodeURIComponent(parts[0])] = (null === parts[1]) ?
                            '' : decodeURIComponent(parts[1]);
                        return obj;
                    }, {});
                }
                if (location.search) {
                    oauth_token = stringQs(window.location.href.split('?')[1]).oauth_token;
                    if (oauth_token.length) {
                        $('#popup-oauth').prop('disabled', true);
                        $('#singlepage-oauth').prop('disabled', false);
                    }
                }
                // ここまで singlepage が true の時のみ必要
                
                $('#singlepage-oauth').on(
                    'click',
                    function (event) {
                        // singlepage が true の実装
                        auth = new osmAuth(
                            {
                                // url : 'http://api06.dev.openstreetmap.org',
                                oauth_consumer_key : '6xjntOLBBDWm8VoBVzI8WvkBRC77xHQyroCD5yBV',
                                oauth_secret : 'RUN39yYiNHfrQZ47pKErrYxwN2erhh7Z3VzOlMkW',
                                landing : 'singlepage-land.html',
                                singlepage : true,
                                auto : true
                            }
                        );
                        
                        // oauth_token が返ってきてたら
                        if (oauth_token && oauth_token.length) {
                            // singlepage では opener.authComplete が使えないので、 auth.bootstrapToken を使う
                            auth.bootstrapToken (oauth_token, function(){});
                        }
                        $('#popup-oauth').prop('disabled', true);
                        $('#get-user-data, #logout').prop('disabled', false);
                    }
                );
                
                $('#popup-oauth').on(
                    'click',
                    function (event) {
                        // ポップアップ時の実装
                        auth = new osmAuth(
                            {
                                // url : 'http://api06.dev.openstreetmap.org',
                                oauth_consumer_key : '6xjntOLBBDWm8VoBVzI8WvkBRC77xHQyroCD5yBV',
                                oauth_secret : 'RUN39yYiNHfrQZ47pKErrYxwN2erhh7Z3VzOlMkW',
                                auto : true
                            }
                        );
                        $('#singlepage-oauth').prop('disabled', true);
                        $('#get-user-data, #logout').prop('disabled', false);
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
                                $('#result').append('<div></div>');
                                $('#result > div:last-child').text('表示名:'+userData.getAttribute('display_name'));
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
                        $('#singlepage-oauth, #popup-oauth').prop('disabled', false);
                        $('#get-user-data, #logout').prop('disabled', true);
                    }
                );
            }
        );
    }
)();