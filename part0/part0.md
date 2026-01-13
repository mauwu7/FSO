## Parte 0.4

```mermaid

    flowchart TD
        A[Submit the form with the new note ] -->|The request performs an HTTP POST| B(The server response redirects an url to make an HTTP GET request to /exampleapp/notes)
        B --> C{The browser reloads the notes page, and it causes three HTTP requests}
        C --> D[Get the stylesheet in main.css]
        C --> E[Get the Javascript code in main.js]
        C -->F[Get the data in data.json]

```

## Parte 0.5

```mermaid
    flowchart LR
        
        A[At the beginning, the client performs a request to get the HTML] --> B(When it loads the HTML it also get the main.css and spa.js, which means another two get requests.)
        
        B -->|The code in js fetch the data from the server in json| C[Then with js, the content in the HTML is manipulated in order to show the data stored in the server]
```

## Parte 0.6

```mermaid

    flowchart LR
    A[When the user saves the new note it causes the execution of form´s event handler.] -->|The function creates a note object with the content of the input and the creation date.|
    B(the object is saved in the array of notes)
    B --> D[The function redrawNotes is called to modify the HTML]-->C[Lastly, the object note is sent to the server]
    
```






















































































































