const VerifyPage = () => {
  return (
    <div className="w-[500px] rounded-xl border bg-white p-5">
      <div className="mb-5 mt-3 border-b border-black pb-5 text-center text-xl font-bold">
        アカウント本登録メール送信
      </div>

      <div className="text-sm">
        メールアドレスにアカウント本登録に必要な情報を送信しました。
        <br />
        メールのURLよりアカウント本登録を完了させてください。
        <br />
        <br />
        ※メールが届かない場合、入力したメールアドレスが間違っている可能性があります。
        <br />
        <br />
        お手数ですが、再度、アカウント登録からやり直してください。
      </div>
    </div>
  );
};

export default VerifyPage;
