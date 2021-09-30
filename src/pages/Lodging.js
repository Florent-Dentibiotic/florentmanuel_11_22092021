import Carrousel from "../components/Carrousel"
import styled from 'styled-components'
import colors from '../utils/style/color'
import { Component } from "react"
import Dropdown from "../components/Dropdown"
import Tags from "../components/Tags"

const LodgingH1 = styled.h1`
    font-size: 36px;
    color: ${colors.primary};
`

const LodgingH2 = styled.h2`
    font-size: 18px;
    color: ${colors.primary};
`
const InfosSection = styled.section`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(auto, 580px));
    gap: 76px;
`

class Lodging extends Component{
    constructor(props) {
    super(props)
    this.state = {
        lodgingId: this.props.match.params.lodgingId,
        lodgingData: []
    }
}

componentDidMount() {
    // const { id } = this.props.match.params
 
    fetch(`../logements.json`)
    .then((response) => response.json())
    .then((jsonResponse) => {
        this.setState({ lodgingData: jsonResponse.find(e => e.id === this.state.lodgingId) })
        console.log(this.state.lodgingData)
    })
}

    render(){    
        const lodgingData = this.state.lodgingData
        const Equipments = this.state.lodgingData.equipments
        console.log(Equipments)
        // let userId = this.props.match.params.lodgingId;
    return(
        <main>
            <Carrousel imgs={lodgingData.pictures}/>
            <LodgingH1>{lodgingData.title}</LodgingH1>
            <LodgingH2>{lodgingData.location}</LodgingH2>
            <Tags tags= {lodgingData.tags}/>
            <InfosSection>
            <Dropdown title={`Description`} details={lodgingData.description}/>
            <Dropdown title={`Équipements`} details={<ul>{Equipments && Equipments.map(equipment => <li key={`equipment-${equipment}`}>{equipment}</li>)}</ul>}/>
            </InfosSection>
        </main>
    )}
}

export default Lodging