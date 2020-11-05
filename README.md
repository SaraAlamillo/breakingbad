<h1>Breaking Bad's Wiki</h1>
<ul>
<li>Componentes funcionales: Todos los incluidos en el directorio /src/components. Además, la idea de estos componentes es que se puedan utilizar de forma aisla. En principio, lo único que necesitarían en Material UI.</li>
<li>Hooks y hooks personalizados: He utilizado varios hooks en, por ejemplo, /scr/components, pero no he llegado a crear ninguno personalizado</li>
<li>Componentes de clase con uso de su ciclo de vida: Todos los incluidos en el directorio /src/pages</li>
<li>Provider (el de react-router no cuenta): El icono flotante de la esquina inferior derecha es un selector de temas. El provider está en /src/providers/Theme y su correspondiente componente está en /src/components/ThemeSelector</li>
<li>Algún tipo de render props: prácticamente en cualquier fichero de los creados. Por ejemplo, en /src/components.</li>
<li>React router: El principal está en App.js, pero las rutas anidadas se pueden ver, por ejemplo, en /src/pages/Seasons.page.jsx.</li>
<li>Formulario controlado: No he creado el buscador como tal, pero creé un pequeño formulario en el listado de personajes (/src/pages/Characters.page.jsx.) </li>
<li>Control de errores y carga de datos: Creé las acciones y demás para controlar los errores, pero no he llegado a mostrarlos por pantalla.</li>
<li>He utilizado tanto Redux como Sagas.</li>
<li>Como librería no explica he utilizado Material UI.</li>
<li>Todos los datos están en el estado global, por lo que si no es necesaria su actualización, no se llama a la API. Se puede ver en, por ejemplo, /src/pages/Deaths.page.jsx </li>
</ul>
