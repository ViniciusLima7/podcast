import styles from './styles.module.scss';

export function Player() {



    return (
        <div className={styles.playerContainer}>
            <header>
                <img src="/playing.svg" alt="Tocando Agora"></img>
                <strong>Tocando Agora</strong>
            </header>

            <div className={styles.emptyPlayer}>
                <strong>Selecione um Podcast para ouvir</strong>

            </div>


            <footer className={styles.empty}>
                <div className={styles.progress}>
                    <span>00:00</span>
                    <div className={styles.slider}>
                        <div className={styles.emptySlider} />
                    </div>
                    <span>00:00</span>
                </div>

                <div className={styles.buttons}>
                    <button type="button">
                        <img src="/shuffle.svg" alt="Embaralahr"></img>
                    </button>
                    <button type="button">
                        <img src="/play-previous.svg" alt="Tocar Anterior"></img>
                    </button>
                    <button type="button" className={styles.playButton}>
                        <img src="/play.svg" alt="Tocar"></img>
                    </button>
                    <button type="button">
                        <img src="/play-next.svg" alt="Tocar Próxima"></img>
                    </button>
                    <button type="button">
                        <img src="/repeat.svg" alt="Repetir"></img>
                    </button>
                </div>
            </footer>
        </div>


    )

}