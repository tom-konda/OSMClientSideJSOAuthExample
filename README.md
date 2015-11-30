# これは何？
OpenStreetMap の API に OAuth 接続する際に、クライアントサイド JavaScript から API に接続する実装例です。

# シングルページ有効時の実装の説明
[OpenStreetMap Advent Calendar 2日目](https://qiita.com/tom_konda/items/eb36d096e52089aef8a5)の記事を読んでいることを前提としているので、
未読の場合は先にお読みいただくことをお勧めします。

Advent Calendar の実装例では、 `singlepage` パラメータを使用していませんでしたが、 Github の実装では `singlepage` が `true` のパターンも実装しています。
この場合、`singlepage` パラメータを使用していないパターンに比べて、以下の点の理由で実装が複雑になってきます。

1. 元のページを残したまま、アプリケーションの認可画面に飛ばない
 * ポップアップ時では、元のページのスクリプトをポップアップから呼び出せたので、 `opener.authComplete(oauth_token入りURL)` で処理を完了できた
2. 関数の処理の関係上、シングルページでは `window.authComplete` メソッドが存在しない
 * 処理を完了するための `window.authComplete` メソッドは、 `osmAuth.authenticate` メソッド実行時に[作成される](https://github.com/osmlab/osm-auth/blob/gh-pages/osmauth.js#L82)が、OpenStreetMap からコールバック時にこのメソッドを実行することはないため、ポップアップ時と同様な処理で完了できない

このままだと、 アクセストークンの登録が完了できないため API を使用できない状態になってしまいます。
そこで、 `osmAuth.bootstrapToken` メソッドを OpenStreetMap からコールバック時に呼び出し、アクセストークンの登録を完了させます。

# 参考文献
* [osm-auth](https://github.com/osmlab/osm-auth)
* [JA:API v0.6](http://wiki.openstreetmap.org/wiki/JA:API_v0.6)