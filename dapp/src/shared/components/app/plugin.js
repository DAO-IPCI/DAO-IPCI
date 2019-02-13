import React from 'react'

const Plugin = function Plugin() {
  return (
    <div>
      <h1>Please, setup one of the suggested plugins for working with dApp</h1>
      <div className="row">
        <div className="col-md-6 col-sm-6 box-item">
          <div className="box">
            <figure><img src="assets/img/metamask.png" alt="" /></figure>
            <h3 className="name">Metamask </h3>
            <p className="title textcol-gray">Chrome plugin</p>
            <p className="description">
              Metamask –простой и быстрый способ начать работу с dApp IPCI. Не требует
              синхронизации всей истории блоков сети Ethereum на локальный компьютер.
              Безопасность обеспечивается за счёт локального хранения ключа доступа к
              вашему Ethereum аккаунту.
            </p>
            <a className="btn btn-default" role="button" href="https://metamask.io/" target="_blank" rel="noopener noreferrer" data-bs-hover-animate="pulse">
              <span className="inline-mid">Official website </span> <i className="fa fa-mail-forward m-l-5 inline-mid" />
            </a>
          </div>
        </div>
        <div className="col-md-6 col-sm-6 box-item">
          <div className="box">
            <figure><img src="assets/img/ethereum.png" alt="" /></figure>
            <h3 className="name">Ethereum Mist</h3>
            <p className="title textcol-gray">Browser for using Ðapps</p>
            <p className="description">
              Mist – полный клиент сети Ethereum, обеспечивает полную автономность работы с сетью.
              Рекомендуется для использования продвинутыми пользователями. Требует не менее
              30 Гб свободного места на жестком диске и полной синхронизации истории блоков
              перед началом работы.
            </p>
            <a className="btn btn-default" role="button" href="https://github.com/ethereum/mist/releases" target="_blank" rel="noopener noreferrer" data-bs-hover-animate="pulse">
              <span className="inline-mid">GitHub releases </span> <i className="fa fa-mail-forward m-l-5 inline-mid" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Plugin
