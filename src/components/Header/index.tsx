import styles from './styles.module.scss';
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'

export function Header() {
    const currentDate = format(new Date(), 'EEEEEE, d MMMM ', {
        locale: ptBR,
    });

    return (
        <header className={styles.headerContainer}>
            <>
                <img src="headphones-solid.svg" alt="Podcastr" width="40" />
                <strong>Podcastr</strong>
            </>
            <p> O melhor para você ouvir, sempre</p>

            <span>{currentDate}</span>
        </header>
    )
}