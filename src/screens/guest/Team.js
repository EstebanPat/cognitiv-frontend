import React from 'react'
import "./Team.scss"
import ActionAreaCard from '../../components/Surfaces/Card'
import Carolina from "../../assets/images/global/Carolina.png"
import Santiago from "../../assets/images/global/Santiago.png"

const Team = () => {
  return (
    <div className='team-container'>
      <div className='people'>
        <ActionAreaCard
          image={Carolina}
          title="CEO | Carolina Márquez Narváez"
          description="Ingeniera de Sistemas | Maestría en Ingeniería"
          description2= "Candidata a Doctora en Informática"
          content={
            <>
            Docente e Investigadora, Universidad Autónoma de Manizales <br/>
            Coordinadora del Programa de Ingeniería de Sistemas, <br/> Universidad Autónoma de Manizales <br/>
            Con más de 10 años de experiencia trabajando <br/>por la calidad de vida del adulto mayor <br/>
            </>
          }
        />

        <ActionAreaCard
          image={Santiago}
          title="CTO | Santiago  Murillo Rendón"
          description="Ingeniero Electronico | Maestría en Ingeniería"
          description2= "Doctor en Ciencias Cognitivas"
          content={
            <>
            Docente e Investigador, Universidad Autónoma de Manizales <br/> Universidad de Caldas <br/> 
            Con más de 10 años de experiencia <br/>  trabajando por la calidad de vida del adulto mayor
            </>
          }
        />
      </div>

      <div className='team-content'>
        <p>Equipo</p>

        <p>
          Somos un equipo excepcional de docentes universitarios e investigadores comprometidos
          con la mejora de la calidad de vida de los adultos mayores. Con más de una década de experiencia
          dedicada a comprender y abordar los desafíos del envejecimiento, el deterioro cognitivo y la independencia, 
          estamos aquí para marcar la diferencia.
        </p>

        <p>
          Nuestro equipo multidisciplinario combina la experiencia de ingenieros, psicólogos y neuropsicólogos,
          lo que nos permite abordar los aspectos cognitivos y físicos de una manera completa y efectiva. 
          Creemos que la tecnología y la investigación pueden revolucionar la forma en que envejecemos, 
          y estamos comprometidos a hacerlo realidad
        </p>

        <p>
          En Cognitiv, nuestro equipo no solo trabaja para mantener a las personas mayores activas y saludables, 
          sino también para inspirar y empoderar a toda una generación a vivir con plenitud. Estamos emocionados 
          de tener la oportunidad de colaborar contigo en este emocionante viaje hacia un envejecimiento más saludable y feliz.
        </p>

      </div>

    </div>
  )
}

export default Team
