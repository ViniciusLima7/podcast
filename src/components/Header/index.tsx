import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import styles from './styles.module.scss';

export function Header() {
    //Data Atual no formato dia da Semana dia do Mes e Mes
    const currentDate = format(new Date(), 'EEEEEE, d MMMM', { locale: ptBR, });


    return (
        //React Não usa Class usa ClassName, porque Class é uma palavra reservada JavaSCRIPT
        <header className={styles.headerContainer}>
            <img src="/logo.svg" alt="Podcast"></img>
            {/* Alt usado para acessibilidade */}


            <p>O Melhor para você ouvir sempre !!! </p>
            <span>{currentDate}</span>
        </header>
    )

}