import { useCallback, useEffect, useState } from "react";
import TestAxios from "../../apis/TestAxios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";

const EditLinija = () => {

    const urlParams = useParams()
    const linijaId = urlParams.id

    let linijaInit = { id: -1, brojMesta: -1, cenaKarte: 0.00, destinacija: '', vremePolaska: '', prevoznikId: -1 }

    // const[updateLinija,setUpdateLinija] = useState(linijaInit)
    const [updateBrojMesta, setUpdateBrojMesta] = useState(-1)
    const [updateCenaKarte, setUpdateCenaKarte] = useState(-1)
    const [updateDestinacija, setUpdateDestinacija] = useState('')
    const [updateVremePolaska, setUpdateVremePolaska] = useState('')
    const [updatePrevoznikId, setUpdatePrevoznikId] = useState(-1)
    const [prevoznici, setPrevoznici] = useState([])

    const navigate = useNavigate()

    const getPrevoznici = useCallback(() => {
        TestAxios.get('/prevoznici')
            .then(res => {
                console.log(res.data)
                setPrevoznici(res.data)
            }).catch(error => {
                console.log(error)
                alert('Error occured please try again!');
            })
    })

    const getLinija = useCallback(() => {
        TestAxios.get('/linije/' + linijaId)
            .then(res => {
                console.log(res)
                // setUpdateLinija({id: res.data.id , brojMesta: res.data.brojMesta, cenaKarte: res.data.cenaKarte, destinacija: res.data.destinacija,
                //             vremePolaska: res.data.vremePolaska, prevoznikId: res.data.prevoznikId, prevoznikNaziv: res.data.prevoznikNaziv })
                setUpdateBrojMesta(res.data.brojMesta)
                setUpdateCenaKarte(res.data.cenaKarte)
                setUpdateDestinacija(res.data.destinacija)
                setUpdateVremePolaska(res.data.vremePolaska)
                setUpdatePrevoznikId(res.data.prevoznikId)
            }).catch(error => {
                console.log(error)
                alert("Doslo je do greske")
            })
    })

    useEffect(() => {
        getPrevoznici()
        getLinija()
    }, [])


    const renderPrevoznici = () => {

        return prevoznici.map((temp) => <option key={temp.id} value={temp.id}>{temp.naziv}</option>)
    }

    // const valueInputChanged = (e) => {
    //     let input = e.target;

    //     let name = input.name;
    //     let value = input.value;

    //     let linijaFromState = updateLinija;
    //     console.log(linijaFromState[name])
    //     linijaFromState[name] = value;

    //     console.log(linijaFromState[name] + ' '  + value)
    //     setUpdateLinija(linijaFromState)
    //     console.log(updateLinija)
    // }

    //to do finish edit function
    const edit = () => {
        var dto = {
            id: linijaId,
            brojMesta: updateBrojMesta,
            cenaKarte: updateCenaKarte,
            destinacija: updateDestinacija,
            vremePolaska: updateVremePolaska,
            prevoznikId: updatePrevoznikId
        }

        console.log(dto)

        TestAxios.put('/linije/' + linijaId, dto)
            .then(res => {
                alert('Uspesna izmena')
                navigate('/linije')
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <Row className="justify-content-center">
            <Col md={6}>
                <Form>
                    <Form.Group>
                        <Form.Label htmlFor="brojMesta">Broj mesta</Form.Label>
                        <Form.Control type="number" id="brojMesta" name="brojMesta" value={updateBrojMesta} onChange={(e) => setUpdateBrojMesta(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="cenaKarte">Cena karte</Form.Label>
                        <Form.Control type="number" id="cenaKarte" name="cenaKarte" value={updateCenaKarte} onChange={(e) => setUpdateCenaKarte(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="destinacija">Destinacija</Form.Label>
                        <Form.Control type="text" id="destinacija" name="destinacija" value={updateDestinacija} onChange={(e) => setUpdateDestinacija(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Vreme polaska</Form.Label>
                        <Form.Control type="text" name="vremePolaska" value={updateVremePolaska} onChange={(e) => setUpdateVremePolaska(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Prevoznik</Form.Label>
                        <Form.Select name="prevoznikId" value={updatePrevoznikId} onChange={(e) => setUpdatePrevoznikId(e.target.value)}>
                            {renderPrevoznici()}
                        </Form.Select>
                    </Form.Group>
                </Form>
                <Button style={{ marginTop: 10 }} onClick={edit} >Edit</Button>
            </Col>
        </Row>
    )
}

export default EditLinija