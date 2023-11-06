import React from 'react'
import logo from '../../assets/images/global/logoNav.png'
import book1 from '../../assets/images/global/book-one.png'
import book2 from '../../assets/images/global/book-two.png'
import "./WhoWeAre.scss"

const WhoWeAre = () => {
  return (
    <div className='about-us'>
        <div className='about-row'>
            <div className='about-image'>
                <img src={logo} alt='' className='logo'></img>
            </div>
            <div className='about-content'>
                <p>
                    ¿Quienes somos?
                </p>

                <p>
                    Nuestro Legado de Investigación: Dedicados al Bienestar de los Adultos Mayores
                </p>

                <p>
                    En Cognitiv, nuestra misión de mejorar la calidad de vida de los adultos mayores se ha forjado a 
                    través de una profunda dedicación a la investigación. Nuestro equipo, ha cultivado una experiencia 
                    de más de una década en el estudio del envejecimiento y el deterioro cognitivo.
                </p>

                <p>
                    Nuestra contribución a la comprensión de estos desafíos se refleja en una serie de logros notables:
                </p>
            </div>
        </div>

        <div className='about-books'>
            <div className='book-one'>
                <div className='book-one-text'>
                    <p>
                        Libro "Deterioro Cognitivo en Caldas: Su prevalencia y relación con factores sociodemográficos y patológicos":
                    </p>
                </div>
                <div className='book-one-image'>
                    <img src={book1} alt='' className='logo'></img>
                </div>
                <div className='book-one-text-one'>
                    <p>
                        Este libro representa uno de nuestros logros más significativos. En él, exploramos la prevalencia del deterioro
                        cognitivo y su relación con factores sociodemográficos y patológicos en la región de Caldas. Este trabajo de 
                        investigación proporciona valiosa información para comprender y abordar el deterioro cognitivo.
                    </p>
                </div>
            </div>

            <div className='book-two'>
                <div className='book-two-text'>
                    <p>
                        Cartilla "Deterioro cognitivo leve: Manual para cuidadores":
                    </p>
                </div>
                    
                <div className='book-two-image'>
                    <img src={book2} alt='' className='logo'></img>
                </div>
                <div className='book-two-text-two'>

                    <p>
                        Reconociendo la importancia de brindar apoyo práctico, hemos desarrollado una cartilla que sirve 
                        como un recurso esencial para cuidadores. Escrito en un lenguaje cotidiano y basado en una prueba 
                        piloto con participantes en los municipios de Caldas, este manual ofrece pautas para estimulación 
                        cognitiva y cuidado de adultos mayores con deterioro cognitivo leve.
                    </p>
                </div>
            </div>
        </div>

        <div className='info'>
            <p>
                Artículos Científicos Relevantes: <br/> Nuestro compromiso con la investigación se refleja en una serie de artículos 
                científicos <br/> publicados en revistas académicas de renombre. 
                <br/> Algunos de estos artículos incluyen:
            </p>

            <p>
                <li>
                    "Prescripción del ejercicio físico desde la realidad virtual semi-inmersiva, 
                    alternativa en los procesos de rehabilitación funcional para el adulto mayor."
                </li>

                <li>
                    "Impacto de IoT en la prevención, asistencia, detección y rehabilitación de pacientes 
                    con deterioro cognitivo: una revisión."
                </li>

                <li>
                    "Effects of virtual reality-based aerobic endurance training on the functional fitness 
                    of healthy older adults: A systematic review."
                </li>
                
                <li>
                    "Intelligent Hybrid Approach for Computer-Aided Diagnosis of Mild Cognitive Impairment."
                </li>
            </p>

            <p>
                Estos antecedentes de investigación respaldan nuestro compromiso con el bienestar de los adultos mayores
                y nuestra búsqueda constante de soluciones innovadoras. <br/> En Cognitiv, combinamos la investigación rigurosa 
                con la tecnología para marcar la diferencia en la vida de las personas mayores.
            </p>
        </div>
    </div>
  )
}

export default WhoWeAre
