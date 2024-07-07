import { useCallback, useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { Row } from "react-bootstrap"
import { Form } from "react-bootstrap"
import { Col } from "react-bootstrap"
import TestAxios from "../../apis/TestAxios"
import { useNavigate } from "react-router-dom"


export const AddLinija = () => {

    let linijaInit = {brojMesta: 0, cenaKarte: 0.00, destinacija: '', vremePolaska: '', prevoznikId: 0}

    const [linija, setLinija] = useState (linijaInit)
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

    useEffect(() => {
        getPrevoznici()
    }, [])

    const renderPrevoznici = () => {

        return prevoznici.map((temp) => <option key={temp.id} value={temp.id}>{temp.naziv}</option>)
    }

    const valueInputChanged = (e) => {
        let input = e.target;

        let name = input.name;
        let value = input.value;

        let linijaFromState = linija;
        linijaFromState[name] = value;

       
        setLinija(linijaFromState)
        console.log(linija)
    }

    const add = () => {
        var dto = {
            brojMesta: linija.brojMesta, 
            cenaKarte: linija.cenaKarte, 
            destinacija: linija.destinacija, 
            vremePolaska: linija.vremePolaska, 
            prevoznikId: linija.prevoznikId}

        console.log(dto)

        TestAxios.post('/linije', dto)
            .then(res => {
                alert('Dodavanje uspesno')
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
                        <Form.Label>Broj mesta</Form.Label>
                        <Form.Control type="number" name="brojMesta"  onChange={(e) => valueInputChanged(e)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cena karte</Form.Label>
                        <Form.Control type="number" name="cenaKarte" onChange={(e) => valueInputChanged(e)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Destinacija</Form.Label>
                        <Form.Control type="text" name="destinacija" onChange={(e) => valueInputChanged(e)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Vreme polaska</Form.Label>
                        <Form.Control type="text" name="vremePolaska" onChange={(e) => valueInputChanged(e)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Prevoznik</Form.Label>
                        <Form.Select name="prevoznikId" onChange={(e) => valueInputChanged(e)}>
                            <option>--</option>
                            {renderPrevoznici()}

                        </Form.Select>
                    </Form.Group>
                </Form>
                <Button style={{ marginTop: 10 }} onClick={ add } >Add</Button>
            </Col>
        </Row>
    )
}

