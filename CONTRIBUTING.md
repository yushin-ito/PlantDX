<ol>
  <li>
    <h2>ブランチを切る</h2>
  </li>
  <ol>
    <li>devブランチに移動する</li>
    <p><pre><code>git checkout dev</code></pre></p>
    <li>開発するブランチを作成する</li>
    <p><pre><code>git branch feature/開発するブランチ名</code></pre></p>
    <li>開発するブランチに移動する</li>
    <p><pre><code>git checkout 開発するブランチ名</code></pre></p>
    <li>リモートに反映する</li>
    <p><pre><code>git push origin HEAD</code></pre></p>
  </ol>
  <br>
  <li>
    <h2>開発をする</h2>
  </li>
  <ol>
    <li>開発するブランチに移動する</li>
    <p><pre><code>git checkout 開発するブランチ名</code></pre></p>
    <li>変更内容を取得する</li>
    <p><pre><code>git pull origin dev</code></pre></p>
  </ol>
  <br>
  <li>
    <h2>コミットする</h2>
  </li>
  <ul>
    <li><h4>コミット方法<h4></li>
    <pre><code>git add -A
git commit -m "コミットメッセージ"
git push origin HEAD</code></pre>
    <li><h4>コミットメッセージ</h4></li>
    <p>コミットメッセージは <code>"主題: 内容"</code>の形式</p>
    <li><h4>主題</h4></li>
    <pre><code>Add: 機能追加
Change：機能変更
Remove：機能削除
Fix: 機能修正
Clean: 整形</code></pre>
  </ul>
  <br>
  <li><h2>マージする</h2></li>
  <p>プルリクエストを作成する</p>
  <p>(例) <code>base: dev</code> ← <code>compare home-ui</code></p>
</ol>