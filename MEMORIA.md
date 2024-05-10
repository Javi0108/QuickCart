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

En la era digital actual, la presencia en línea es esencial para el éxito de cualquier empresa, independientemente de su tamaño. Sin embargo, muchas empresas, especialmente las pequeñas y medianas, no han dado el salto a tener su propia página web. Esto se debe, en gran parte, a dos factores clave: el escaso conocimiento de programación y el coste que implica contratar a un programador profesional para crear un sitio web desde cero.

Esta barrera de entrada puede ser significativa para muchas pymes que buscan expandir su alcance y llegar a una audiencia más amplia. A menudo, el proceso de creación de un sitio web parece abrumador, con complejidades técnicas y costos imprevistos que desaniman a los propietarios de negocios a seguir adelante. Es en este contexto nace QuickCart.

QuickCart es una aplicación web diseñada para resolver estos problemas. Proporciona a las empresas la oportunidad de registrarse y crear sus propias páginas web sin necesidad de conocimientos avanzados de programación. La plataforma ofrece una variedad de plantillas altamente personalizables, lo que significa que las empresas pueden diseñar sus sitios web según sus necesidades y preferencias específicas. Cada plantilla puede ser modificada y ajustada para que cada página web tenga un estilo único y refleje la identidad de la empresa.

Esto supone una ayuda para las pymes, ya que pueden tener presencia en línea de manera rápida y económica. Al eliminar la necesidad de contratar a un programador dedicado, QuickCart reduce considerablemente el costo asociado con la creación de un sitio web profesional. Además, su interfaz fácil de usar y su diseño intuitivo hacen que la experiencia de creación de páginas web sea accesible para cualquier persona, incluso sin conocimientos previos de programación.

Con QuickCart, las empresas pueden comenzar con una página web sencilla y luego expandirse a medida que crecen y sus necesidades evolucionan. Esta flexibilidad y accesibilidad facilitan el proceso de digitalización, permitiendo a las empresas competir en un mercado cada vez más digitalizado sin tener que invertir grandes sumas de dinero.

### 2. TECNOLOGÍAS UTILIZADAS. <a name="id2"></a>

El desarrollo de QuickCart implicó uso de diversas frameworks/librerías y hardware para asegurar un funcionamiento eficiente y escalable de la aplicación. Estos frameworks/librerías desempeñaron un papel crucial tanto en la fase de desarrollo como en la producción final del producto. A continuación, se detallan las tecnologías utilizadas:

**Front End**:
Para el desarrollo del lado del cliente, QuickCart empleó un conjunto de herramientas que permitieron la creación de interfaces de usuario dinámicas y responsivas:

+ **Angular con TypeScript**: Angular es un framework ampliamente utilizado para la creación de aplicaciones web robustas y de alta calidad. La incorporación de TypeScript, permite una mejor estructura del código y facilita el mantenimiento a largo plazo. Angular facilita la creación de componentes reutilizables y la implementación de lógica compleja en el front-end.
+ **Ionic 7**: Ionic es un framework especializado en la creación de aplicaciones móviles y web con una experiencia de usuario nativa. La versión 7 permite el uso de componentes visuales modernos y herramientas avanzadas para la creación de aplicaciones progresivas (PWA).
+ **Bootstrap 5.1**: Bootstrap es una de las librerías más populares para diseño web, proporcionando estilos y componentes listos para usar. La versión 5.1 incluye mejoras en diseño responsivo y mayor flexibilidad en la personalización. Esto permitió a los desarrolladores de QuickCart crear interfaces atractivas y consistentes sin necesidad de crear estilos desde cero.

**Back End**:
En el lado del servidor, QuickCart utilizó tecnologías que permiten un desarrollo rápido y fiable:

+ **Django 5 con Python**: Django es un framework de alto nivel para el desarrollo de aplicaciones web. Django proporciona a QuickCart un entorno sólido para la creación de funcionalidades de back-end, como autenticación, manejo de datos y gestión de usuarios. Django también incluye herramientas para la creación de interfaces administrativas, facilitando el mantenimiento y la gestión de la aplicación.
+ **SQLite**: Esta base de datos ligera y autónoma es ideal para aplicaciones web que requieren una configuración simple y no necesitan la complejidad de bases de datos más grandes. SQLite ofrece un rendimiento adecuado para aplicaciones como QuickCart.

**Hardware y Despliegue en la Nube**:
En lo referente al hardware, QuickCart está diseñado para ejecutarse en servicios en la nube, específicamente en Microsoft Azure, para su despliegue y operación. Esto significa que no es necesario contar con equipamiento adicional significativo. El uso de Azure ofrece una gran flexibilidad y escalabilidad, permitiendo a QuickCart el ahorro de inversiones sustanciales en hardware físico. Además, Azure garantiza una alta disponibilidad y facilita la implementación de soluciones avanzadas de seguridad y respaldo de datos, asegurando que la aplicación pueda mantenerse segura y operativa en todo momento.

En resumen, QuickCart fue construido utilizando tecnologías modernas y eficientes, tanto en el front-end como en el back-end, lo que permite una experiencia de usuario fluida y un desarrollo ágil. El uso de la nube para el despliegue y operación minimiza la necesidad de hardware adicional, asegurando la escalabilidad y adaptabilidad a las necesidades futuras.

### 3. GUIA DE ESTILO DE LA WEB. <a name="id3"></a>

La guía de estilo de la web establece los estándares visuales y de experiencia de usuario que se siguen para mantener una apariencia coherente y profesional. En este proyecto, buscamos crear una aplicación web con un diseño lo más limpio posible y moderno. Los elementos clave de nuestra guía de estilo incluyen:

+ **Colores**: Se utilizaron tonos neutros como el blanco(#fff), y un color primario como el violeta o morado(#673de6) para resaltar los elementos importantes y hacer una página visualmente única.
+ **Fuentes**: Se ha elegido la fuente 'Onest' ya que conservaba un estilo acorde con el de la web. Con esta fuente también conseguimos mantener una legibilidad óptima.
+ **Estructura**: Las páginas están estructuradas con una navegación intuitiva y jerárquica para que el usuario tenga una expreriencia de lo más cómoda.

### 4. INVESTIGACIÓN. <a name="id4"></a>

Durante el desarrollo de QuickCart, se realizaron investigaciones para abordar diversas cuestiones técnicas y de diseño que surgieron a lo largo del proyecto. A través de estas investigaciones, el equipo pudo superar retos importantes y avanzar hacia un producto final sólido. A continuación, se detallan algunas de las áreas clave de investigación:

+ **Integración de Tecnologías**: Dado que el equipo no tenía experiencia previa combinando Django y Angular en un solo proyecto, se tuvo que investigar cómo hacer para que estos dos frameworks trabajaran en conjunto de manera eficaz. Este proceso requirió un estudio profundo para entender las interacciones entre ambos frameworks. Fue un reto que llevó tiempo y experimentación, pero resultó ser una experiencia satisfactoria para todo el equipo.
+ **Experiencia de Usuario (UX)**: La usabilidad de la aplicación fue una prioridad desde el principio. Se maximizaron los intentos para asegurarse de que QuickCart ofreciera una experiencia agradable y sencilla para el usuario final. El objetivo era hacer que los visitantes de la aplicación encontraran lo que necesitaban de manera intuitiva y quisieran regresar en el futuro.

Aunque el equipo logró avanzar en muchas áreas, no todo funcionó a la primera. Algunos enfoques y desarrollos tuvieron que ser modificados o incluso descartados debido a dificultades técnicas, limitaciones de tiempo o simplemente porque no cumplían con las expectativas.

### 5. DERECHOS DE AUTOR. <a name="id5"></a>

En QuickCart, se incorporaron varios tipos de contenido y recursos multimedia para enriquecer la experiencia del usuario y mejorar el aspecto visual de la aplicación. Para garantizar el cumplimiento de las leyes de propiedad intelectual y respetar los derechos de autor, se implementaron las siguientes medidas:

+ **Desarrollo Propio**: El logotipo de QuickCart fue diseñado por el equipo interno utilizando Adobe Photoshop, asegurando que el diseño sea original. Este recurso fue publicado bajo una licencia Creative Commons, lo que proporciona cierta flexibilidad para su uso, mientras se mantienen los créditos al creador original.
+ **Uso de Materiales de Terceros**: Para fuentes tipográficas y elementos de estilo, QuickCart hizo uso de recursos ampliamente reconocidos y utilizados, como Google Fonts para las fuentes y Ionic o Bootstrap para estilos e íconos. Ambos son proyectos con licencias que permiten su uso en aplicaciones comerciales, sin restricciones significativas sobre redistribución. Este tipo de licencias asegura que QuickCart puede utilizar estos recursos sin violar derechos de autor o restricciones legales.
+ **Recursos de Imágenes**: En cuanto a imágenes y gráficos utilizados en la aplicación, se seleccionaron cuidadosamente para asegurarse de que no estuvieran sujetos a licencias restrictivas. El equipo eligió imágenes libres de derechos o publicadas bajo licencias que permiten su uso comercial, asegurando que se alinearan con los objetivos de QuickCart sin incurrir en problemas legales.

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

QuickCart es una plataforma de comercio electrónico diseñada para ayudar a las empresas a crear y gestionar sus propias tiendas en línea. Esta solución permite a las empresas digitalizarse y ahorrar costos, ya que elimina la necesidad de contratar desarrolladores para crear una tienda desde cero. QuickCart proporciona un conjunto de funcionalidades clave que facilitan la venta de productos y la gestión de tiendas online. A continuación, se describen las principales características de la plataforma:
+ **Página Principal (Home)**: La página de inicio actúa como la puerta de entrada a la plataforma, ofreciendo una visión general de los apartados más destacados. Los visitantes pueden navegar fácilmente por las diferentes secciones para encontrar lo que buscan.
<div align="center">

<img src="/img/home_img.png" width="600px">

</div>

+ **Gestión de cuentas**: Permite a los usuarios registrarse, iniciar sesión y editar sus perfiles de manera sencilla. Los usuarios pueden actualizar su información personal, cambiar contraseñas y gestionar sus cuentas sin complicaciones.
<div align="center">

<img src="/img/profile_img.png" width="600px">

</div>

+ **Gestión de tiendas**: Las empresas tienen la capacidad de gestionar sus tiendas de manera intuitiva. Esto incluye la administración de productos, el diseño de las páginas web de las tiendas y la visualización de los productos de manera atractiva para los clientes. Las empresas pueden agregar, eliminar o actualizar productos según sea necesario.
<div align="center">

<img src="/img/shops_img.png" width="600px">

</div>
<div align="center">

<img src="/img/shops_img(2).png" width="600px">

</div>

+ **Gestión del carrito**: Los clientes pueden agregar productos a su carrito de compras, ajustar cantidades y eliminar productos con facilidad. Este sistema intuitivo permite a los clientes llevar un seguimiento de sus compras y hacer ajustes antes de proceder al pago.
***IMAGEN***
<!-- <div align="center">

<img src="/img/cart_img.png" width="600px">

</div> -->

+ **Barra de búsqueda**: QuickCart incluye una barra de búsqueda que permite a los clientes buscar tiendas por diferentes criterios, como nombre, categoría o empresa. Esto facilita la navegación y ayuda a los usuarios a encontrar rápidamente lo que necesitan.
<div align="center">

<img src="/img/barra_de_busqueda.png" width="600px">

</div>

+ **Sistema de pago**: Los clientes pueden pagar por sus productos utilizando Stripe, una plataforma de pagos segura y confiable. Stripe actúa como intermediario entre el cliente y la empresa, facilitando las transacciones y asegurando la seguridad de los datos financieros.
***IMAGEN***
<!-- <div align="center">

<img src="/img/payment_img.png" width="600px">

</div> -->
La arquitectura de QuickCart, basada en Django y Angular, garantiza un sistema estable y escalable. Django, como framework backend, ofrece una sólida base para la lógica empresarial, mientras que Angular proporciona una experiencia de usuario interactiva y fluida. El despliegue en Microsoft Azure brinda la flexibilidad y escalabilidad necesarias para adaptarse a diferentes niveles de demanda, permitiendo un mantenimiento eficiente y la capacidad de crecer según las necesidades del mercado.
    
### 12.  EXPERIENCIAS APRENDIDAS A TENER EN CUENTA EN PRÓXIMOS PROYECTOS. <a name="id12"></a>

Durante el desarrollo de QuickCart, se aprendieron varias lecciones importantes y a tener en cuenta:

+ **Comunicación y colaboración**: La comunicación constante en el equipo y el uso de GitHub para el control de versiones fue esencial para la cohesión durante el desarrollo del proyecto.
+ **Planificación flexible**: Mantener una planificación flexible permitió ajustar el cronograma para compensar retrasos inesperados o cualquier problema con el desarrollo.
+ **Organización**: Mantener el proyecto organizado de una manera fácilmente entendible para que en el desarrollo de la aplicación no se hagan difíciles tareas que deberían ser fáciles.

Estas experiencias nos servirán para futuros proyectos, permitiendonos mejorar la planificación y la ejecución del desarrollo de aplicaciones.

### 13.  CONCLUSIONES, COMENTARIOS Y VALORACIÓN FINAL. <a name="id13"></a>

El proyecto QuickCart ha superado las expectativas y ha demostrado ser un éxito rotundo. El equipo ha logrado cumplir con los objetivos planteados inicialmente, creando una aplicación funcional que respeta el concepto original desde el principio. A lo largo del desarrollo, surgieron varios problemas que pusieron a prueba al equipo. Entre ellos, hubo problemas relacionados con la integración de ciertas funcionalidades y componentes, así como la necesidad de ajustar el flujo de trabajo debido a un tiempo limitado para completar el proyecto. A pesar de estas dificultades, el equipo logró avanzar y alcanzar el resultado deseado.

El equipo está satisfecho con la aplicación que se logró construir. No obstante, reconoce que el proyecto tiene potencial para crecer aún más. Hay diversas funcionalidades e ideas que tuvieron que ser descartadas debido a restricciones de tiempo, pero el equipo piensa trabajar en ellas en futuras actualizaciones. Estas actualizaciones podrían convertir a QuickCart en una herramienta aún más valiosa para aquellas empresas que desean expandir su presencia en línea o digitalizarse pero que carecen de los conocimientos técnicos para hacerlo por sí mismas.

En cuanto al impacto del proyecto en el equipo, la experiencia de desarrollar QuickCart ha sido gratificante. Los miembros del equipo han adquirido conocimientos y habilidades valiosas durante el proceso. Han aprendido a abordar problemas de una manera más eficaz, a ser flexibles ante los imprevistos y a mejorar la comunicación y coordinación interna. Estas lecciones serán fundamentales para proyectos futuros, permitiendo al equipo abordar desarrollos similares con mayor eficiencia y precisión.