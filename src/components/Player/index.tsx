import styles from './styles.module.scss';

export function Player() {

    return (
        <div className={styles.playerContainer}>
            <header>
                <img src="headphones.svg" alt="" width="30" />

                <strong>Tocando agora</strong>
            </header>

            <div className={styles.emptyPlayer}>
                <strong>Selecione um podcast para ouvir</strong>
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
                        <img src="random.svg" alt="Embaralhar" width="35" />
                    </button>
                    <button type="button">
                        <img src="backward.svg" alt="Tocar anterior" width="35" />
                    </button>
                    <button type="button" className={styles.playButton}>
                        <img src="play.svg" alt="Tocar" width="35" />
                    </button>
                    <button type="button">
                        <img src="forward.svg" alt="Tocar proximo" width="35" />
                    </button>
                    <button type="button">
                        <img src="repeat.svg" alt="Repetir" width="35" />
                    </button>
                </div>
            </footer>
        </div>
    )
}