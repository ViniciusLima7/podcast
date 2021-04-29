//fica por volta de toda aplicação assim como _app
//Porém ele so é carregado uma única vez.

import Document, { Html, Head, Main, NextScript } from 'next/document';


//Documentação Next manda importar usando class
export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&display=swap" rel="stylesheet" />
                </Head>
                <body>

                    <Main /> {/* Main é onde Fica a Aplicação */}
                    <NextScript />{/* NextScript é onde fica os Scripts */}
                </body>
            </Html>
        );
    }
}