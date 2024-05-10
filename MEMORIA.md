<center>

# MEMORIA FINAL
***


</center>

<right>


***Autor/es:***  
+ Alejandro Pérez Martín
+ Raúl González Martín
+ Javier García Domínguez

***Fecha:***  10-05-2024

***Tutor:*** Alejandro Martín Zarza



</right>

<center>

# INDICE 

</center>

1. [***INTRODUCCIÓN.***](#id1)
2. [***TECNOLOGÍAS UTILIZADAS.***](#id2)
3. [***GUIA DE ESTILO DE LA WEB.***](#id3)
4. [***INVESTIGACIÓN.***](#id4)
5. [***DERECHOS DE AUTOR.***](#id5)
6. [***RIESGOS Y MEDIDAS.***](#id6)
7. [***GRADO DE CUMPLIMIENTO EN ALCANCE.***](#id7)
8. [***GRADO DE CUMPLIMIENTO EN TIEMPO.***](#id8)
9. [***GRADO DE CUMPLIMIENTO EN COSTE.***](#id9)
10. [***PRODUCTO FINAL.***](#id10)
11. [***EXPEIRNECIAS APRENDIDAS A TENER EN CUENTA EN PRÓXIMOS PROYECTOS.***](#id11)
12. [***CONCLUSIONES, COMENTARIOS Y VALORACIÓN FINAL.***](#id12)


### 1. INTRODUCCIÓN. <a name="id1"></a>

Muchas empresas de hoy en día aún no tienen página web debido a su bajo conocimiento de la programación o a que no se pueden permitir los costes de un programador que les realice dicha página web. Es aquí donde nace QuickCart, esta es una aplicación web en la que las empresas se podrán registrar y crear sus propias páginas web desde cero utilizando plantillas altamente personalizables, por lo que ninguna página web será igual, esto permite a muchas pymes tener una página web sencilla y con bajos costes, por lo que la digitalización de la empresa será mucho más fácil y menos costosa de realizar.

### 2. TECNOLOGÍAS UTILIZADAS. <a name="id2"></a>

+ **Front End**:
    - Angular con TypeScript
    - Ionic 7
    - Bootstrap 5.1
+ **Back End**:
    - Django 5 con Python
+ **Base de datos**:
    - SQLite

Estas tecnologías fueron necesarias tanto para la fase de desarrollo como para la producción.

En cuanto al hardware necesario, QuickCart no requiere de equipamiento adicional significativo, ya que se basa en servicios en la nube para su despliegue y operación.

### 3. GUIA DE ESTILO DE LA WEB. <a name="id3"></a>

La guía de estilo de la web establece los estándares visuales y de experiencia de usuario que se siguen para mantener una apariencia coherente y profesional. En este proyecto, buscamos crear una aplicación web con un diseño lo más limpio posible y moderno. Los elementos clave de nuestra guía de estilo incluyen:

+ **Colores**: Se utilizaron tonos neutros como el blanco(#fff), y un color primario como el violeta o morado(#673de6) para resaltar los elementos importantes y hacer una página visualmente única.
+ **Fuentes**: Se ha elegido la fuente 'Onest' ya que conservaba un estilo acorde con el de la web. Con esta fuente también conseguimos mantener una legibilidad óptima.
+ **Estructura**: Las páginas están estructuradas con una navegación intuitiva y jerárquica para que el usuario tenga una expreriencia de lo más cómoda.

### 4. INVESTIGACIÓN. <a name="id4"></a>

Durante el desarrollo de QuickCart, se llevaron a cabo investigaciones para abordar diversas cuestiones técnicas y de diseño. Algunas áreas clave de investigación incluyeron:

+ **Integración de tecnologías**: Se investigó el como combinar Django y Angular en un solo proyecto ya que se escapaba de nuestro conocimiento, por lo que tuvimos que aprender a hacer una aplicación con dos frameworks.
+ **Experiencia de usuario**: Se realizaron estudios para mejorar la usabilidad de la aplicación y que así fuese una experiencia grata y sencilla para el usuario que ingrese a la web, lo que le hará querer volver.

No todo funcionó a la primera, algunos desarrollos tuvieron que ser modificados o descartados debido a problemas de dificultad y tiempo. Sin embargo, el proceso de investigación permitió encontrar soluciones para la mayoría de problemas encontrados.

### 5. DERECHOS DE AUTOR. <a name="id5"></a>

En QuickCart, se utilizaron diversos tipos de contenido y recursos multimedia. Para garantizar el respeto a los derechos de autor, se implementaron las siguientes acciones:

+ **Desarrollo propio**: El logotipo de la aplicación fue creado internamente utilizando Photoshop. Este recurso está publicado bajo una licencia Creative Commons.
+ **Material de terceros**: Se utilizaron librerías como Google Fonts para la fuente y Ionic o Bootstrap para estilos e iconos. Ambos con licencias que permiten su uso para fines comerciales, sin restricciones de redistribución. También se han utilizado imagenes las cuales ninguna está bajo licencias por lo que son aptas para nuestros objetivos de uso.

### 6. RIESGOS Y MEDIDAS. <a name="id6"></a>

Durante el desarrollo del proyecto, surgieron varios problemas, entre ellos:

+ **Integración de funcionalidades y componentes**: Hubo dificultades al integrar algunas funcionalidades a algunos componentes e integrar algunos componentes en si a la aplicación. Para mitigarlo, el equipo se ayudó al completo y se buscó información para arrelgar dicho error lo antes posible.
+ **Cambios de estilo en componententes de Ionic**: Para estilizar un componente de Ionic es necesario utilizar una sintaxis que no está muy documentada, por lo que para arreglar este error tuvimos que investigar más a fondo como estilar dichos componentes.
+ **Desviación de tiempos**: Algunos módulos tardaron más de lo esperado. Para evitar mayores retrasos, se ajustaron las tareas prioritarias y nos ayudamos entre los integrantes del equipo para sacar adelante esos problemas.

### 7. GRADO DE CUMPLIMIENTO EN ALCANCE. <a name="id7"></a>

El proyecto logró cubrir la mayoría de las funcionalidades proyectadasSin embargo, algunas funciones secundarias tuvieron que ser postergados para futuras actualizaciones debido a restricciones de tiempo. Las funcionalidades implementadas incluyen:

+ **Gestión de cuentas**: Registro, inicio de sesión y edición de perfiles.
+ **Gestión de tiendas**: Empresas pueden gestionar los productos, las webs de las tiendas para la visualizacion de productos.
+ **Gestión del carrito**: Clientes pueden agregar productos, ajustar cantidades y eliminar elementos.
+ **Barra de búsqueda**: Búsqueda por empresas.
+ **Sistema de pago**: Los clientes pueden pagar los productos mediante Stripe, un intermediario entre el cliente y la empresa, la cual gestiona los pago y las cuentas.

Algunas funciones secundarias, como las valoraciones de los productos o de las empresas, quedaron fuera del alcance inicial debido a las limitaciones de tiempo pero están planeadas para futuras actualizaciones.

### 8. GRADO DE CUMPLIMIENTO EN TIEMPO. <a name="id8"></a>

El proyecto se completó dentro del plazo, aunque hubo algunos retrasos en etapas específicas, como la del carrito, que nos supuso un pequeño problema ya que se nos había dificultado la implementación de este. La planificación inicial era estimada de 78 días para el desarrollo de la aplicación al completo, pero algunas partes tomaron más tiempo debido a problemas técnicos y la complejidad de la integración, lo que nos hizo dedicarle más tiempo a dichos problemas técnicos que a otras funciones. Sin embargo, mediante ajustes, priorización de tareas y el arduo trabajo del equipo, se logró cumplir con la fecha de entrega final.

### 9. GRADO DE CUMPLIMIENTO EN COSTE. <a name="id9"></a>

El proyecto se mantuvo dentro del presupuesto previsto de **6.427€**. Para evitar desviaciones de costo, se llevaron a cabo revisiones regulares y se ajustaron ciertos elementos para reducir gastos. El control de versiones y la colaboración efectiva ayudaron a minimizar errores y retrasos, manteniendo los costos bajo control.

### 10.  CLAUSULAS. <a name="id10"></a>

El contrato del proyecto incluye las siguientes cláusulas fundamentales:

**Plazos**: Se otorgó un plazo de 2 meses para retrasos imprevistos, con penalizaciones aplicables para las empresas si el retraso excede considerablemente el límite establecido, con lo que conseguiremos que las empresas que se registren en la aplicación sean fiables y no estafen a los clientes.
**Procesamiento de Pagos**: Los pagos se realizarán a través de Stripe, un intermediario que se encargará de gestionar las transacciones y todas las cuestiones relacionadas con las cuentas.

### 11.  PRODUCTO FINAL. <a name="id11"></a>

QuickCart es una plataforma de comercio electrónico en el que se permite a las empresas crear y gestionar sus propias tiendas en línea por lo que las permite digitalizarse ahorrando los gastos que supone contratar a un desarrollador. El sistema ofrece una gama de funcionalidades clave para facilitar la venta de productos:
+ **Home**: Página principal de la web en la que se aprecian los apartados más destacados.
<div align="center">

<img src="/img/home_img.png" width="600px">

</div>

+ **Gestión de cuentas**: Registro, inicio de sesión y edición de perfiles.
<div align="center">

<img src="/img/profile_img.png" width="600px">

</div>

+ **Gestión de tiendas**: Empresas pueden gestionar los productos, las webs de las tiendas para la visualizacion de productos.
<div align="center">

<img src="/img/shops_img.png" width="600px">

</div>
<div align="center">

<img src="/img/shops_img(2).png" width="600px">

</div>

+ **Gestión del carrito**: Clientes pueden agregar productos, ajustar cantidades y eliminar elementos.
***IMAGEN***
<!-- <div align="center">

<img src="/img/cart_img.png" width="600px">

</div> -->

+ **Barra de búsqueda**: Búsqueda por empresas.
<div align="center">

<img src="/img/barra_de_busqueda.png" width="600px">

</div>

+ **Sistema de pago**: Los clientes pueden pagar los productos mediante Stripe, un intermediario entre el cliente y la empresa, la cual gestiona los pago y las cuentas.
***IMAGEN***
<!-- <div align="center">

<img src="/img/payment_img.png" width="600px">

</div> -->
La implementación con Django y Angular garantiza un sistema estable y escalable. El despliegue en Azure facilita el mantenimiento y la escalabilidad.
    
### 12.  EXPERIENCIAS APRENDIDAS A TENER EN CUENTA EN PRÓXIMOS PROYECTOS. <a name="id12"></a>

Durante el desarrollo de QuickCart, se aprendieron varias lecciones importantes y a tener en cuenta:

+ **Comunicación y colaboración**: La comunicación constante en el equipo y el uso de GitHub para el control de versiones fue esencial para la cohesión durante el desarrollo del proyecto.
+ **Planificación flexible**: Mantener una planificación flexible permitió ajustar el cronograma para compensar retrasos inesperados o cualquier problema con el desarrollo.
+ **Organización**: Mantener el proyecto organizado de una manera fácilmente entendible para que en el desarrollo de la aplicación no se hagan difíciles tareas que deberían ser fáciles.

Estas experiencias nos servirán para futuros proyectos, permitiendonos mejorar la planificación y la ejecución del desarrollo de aplicaciones.

### 13.  CONCLUSIONES, COMENTARIOS Y VALORACIÓN FINAL. <a name="id13"></a>

El proyecto de QuickCart ha sido un éxito, el equipo ha logrado los objetivos propuestos y ha conseguido realizar una aplicación funcional siguiendo la misma idea que se tenía desde el principio. A pesar de que en el desarrollo del proyecto se presentaron numerosos problemas como la integración de algunas funcionalidades o componentes, o la desviación de tareas debido a que el tiempo para finalizar el proyecto era limitado, se ha conseguido llegar al objetivo propuesto al principio del desarrollo.
En cuanto al equipo, este se encuentra más que satisfecho con el resultado obtenido de la aplicación, y piensa que añadiendo sus debidas actualizaciones para completar así todas las ideas pensadas para el desarrollo que por desgracia se tuvieron que descartar por la falta de tiempo, QuickCart podría ser una herramienta valiosa para aquellas empresas que busquen expandirse o digitalizarse pero no tengan los conocimientos suficientes. A lo largo de el desarrollo de la aplicación hemos adquirido ciertas experiencias que nos ayudarán en un futuro no muy lejano a mejorar procesos y el enfoque a la hora de desarrollar una aplicación.