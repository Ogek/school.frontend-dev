# Weather

Realizzare in puro JavaScript ES2017 una pagina web per consultare il meteo del LaMMA.
Al caricamento della pagina sarà necessario scaricare tramite Fetch API la lista dei comuni per il quale è disponibile il meteo da:

http://www.lamma.rete.toscana.it/previ/ita/xml/lista_comuni.xml

La pagina dovrà quindi mostrare con una select tale lista e su richiesta fare il download del meteo della singola città, andando a costruire dinamicamente una tabella che ne mostri i dati. Le informazioni relative alla singola città saranno scaricabili tramite l'indirizzo:

http://www.lamma.rete.toscana.it/previ/ita/xml/comuni_web/dati/{città}.xml

## Step 1

Fissare come città Firenze. Scaricare i dati della città tramite fetch API dall'indirizzo:
http://www.lamma.rete.toscana.it/previ/ita/xml/comuni_web/dati/firenze.xml

e parsare l'xml ricevuto tramite DOMParser costruendo la tabella con le indicazioni meteo per i prossimi 5 giorni (ordinati dal più vicino al più lontano).

Per costruire la tabella e parsare l'xml utilizzare esclusivamente le funzioni native implementate dal DOM stesso, come getElementsByTagName, getElementById, getAttribute, createElement, appendChild.

## Step 2

Rifattorizzare quando realizzato per lo step2 per caricare inizialmente la lista delle città e solo successivamente caricati e mostrati i dati meteo di una singola città, che sarà quella scelta dalla select.

Suddividere in modo opportuno l'applicazione in funzioni curandone il design e cercando di ridurre la quantià di codice duplicato.