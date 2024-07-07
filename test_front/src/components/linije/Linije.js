import { useNavigate } from "react-router-dom"
import TestAxios from "../../apis/TestAxios"
import { useEffect, useState } from "react"
import Table from "react-bootstrap/Table"
import { Col, Form, FormCheck, FormLabel, Stack } from "react-bootstrap"
import { Row } from "react-bootstrap"
import { jwtDecode } from 'jwt-decode'
import { Button } from "react-bootstrap"
import FormCheckInput from "react-bootstrap/esm/FormCheckInput"


const Linije = () => {

    let decodedToken = !!localStorage.getItem('jwt') ? jwtDecode(localStorage.getItem('jwt')) : null
    // console.log(decodedToken ? decodedToken.sub : null)
    // console.log(new Date().toISOString().substring(0, 16))
    let isAdmin = decodedToken?.role.authority === 'ROLE_ADMIN'
    
    let isKorisnik = decodedToken?.role.authority === 'ROLE_KORISNIK'
    // console.log(isKorisnik)

    const [linije, setLinije] = useState([])
    const [pageNo, setPageNo] = useState(0)
    const [pageCount, setPageCount] = useState()
    const [checked, setChecked] = useState()
    const [searchParams, setSearchParams] = useState ({})
    const navigate = useNavigate()

    const getLinije = () => {
        TestAxios.get(`/linije?pageNo=${pageNo}`)
            .then(res => {
                console.log(res)
                setLinije(res.data)
                setPageCount(Number(res.headers['total-pages']))
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        getLinije()
    }, [pageNo])

    const obrisi = (id) => {
        TestAxios.delete('/linije/' + id)
            .then(res => {
                console.log(res)
                getLinije()
            }
            )
            .catch(error => {
                console.log(error)
            })
    }

    const goToEdit = (id) => {
        navigate("/linije/" + id)
    }

    const goToAdd = () => {
        navigate('/linije/dodavanje')
    }

    const rezervisi = (id) => {
        var dto = {
            linijaId: id,
            korisnickoIme: decodedToken ? decodedToken.sub : null,
            datumRezervacije: new Date().toISOString().substring(0, 16)
        }

        TestAxios.post(`/linije/${id}/rezervacije`, dto)
            .then(res => {
                console.log(res)
                alert('Uspesna rezervacija')
                window.location.reload()
            }).catch(error => {
                console.log(error)
                alert('Doslo je do greske')
            })
    }

    const renderLinije = () => {
        return linije.map((linija, index) => {
            return (
                <tr key={index}>
                    <td>{linija.prevoznikNaziv}</td>
                    <td>{linija.destinacija}</td>
                    <td>{linija.brojMesta}</td>
                    <td>{linija.vremePolaska}</td>
                    <td>{linija.cenaKarte}</td>
                    {(isAdmin || isKorisnik) ? <td>
                        <Button disabled={linija.brojMesta <= 0} onClick={() => rezervisi(linija.id)} >Rezervisi</Button>
                    </td> : <></>}
                    {isAdmin ? <td>
                        <Button variant="warning" onClick={() => goToEdit(linija.id)}>Edit</Button>
                    </td> : <></>}
                    {isAdmin ? <td>
                        <Button variant="danger" onClick={() => obrisi(linija.id)} >Obrisi</Button>
                    </td> : <></>}
                </tr>
            )
        })
    }

    const renderSearch = () => {
    return (
        <Row className="justify-content-center">
                    <Col md={8}>
                        <Form.Group>
                            <Form.Label>Destinacija</Form.Label>
                            <Form.Control type="text" name="destinacija" onChange={(e) => setSearchParams({...searchParams, destinacija: e.target.value})}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Vreme polaska</Form.Label>
                            <Form.Control type="number" name="maxCena" onChange={(e) => setSearchParams({...searchParams, maxCena: e.target.value})}></Form.Control>
                        </Form.Group>
                        <Button style={{marginTop:10 , marginBottom: 10}} onClick={ getLinije}>Search</Button>
                    </Col>
                </Row>
    )}

    return (

        <Col>
            <Row><h1>Linije</h1></Row>
            <FormCheck>
                <FormCheckInput name="pretraga" onChange={(e) => setChecked(e.target.checked)}></FormCheckInput>
                <FormLabel htmlFor="pretraga">Prikazi pretragu</FormLabel>
            </FormCheck>
            {checked && renderSearch()}
                
            <Row><Col>
                <Table striped bordered hover bg="dark" variant="dark" id="linije=table">
                    <thead>
                        <tr>
                            <th>Naziv prevoznika</th>
                            <th>Destinacija</th>
                            <th>Broj mesta</th>
                            <th>Vreme polaska</th>
                            <th>Cena karte</th>
                            {(isAdmin || isKorisnik) ? <th></th> : <></>}
                            {isAdmin ? <th></th> : <></>}
                            {isAdmin ? <th></th> : <></>}
                        </tr>
                    </thead>
                    <tbody>
                        {renderLinije()}
                    </tbody>
                </Table>
            </Col></Row>
            <Stack direction="horizontal" gap={3}>
                {isAdmin ? <Button className="button button-navy" onClick={() => goToAdd()}>Add</Button> : <></>}
                <Button className="ms-auto" disabled={pageNo === 0} onClick={() => setPageNo(pageNo - 1)}>Prev</Button>
                {pageNo + 1}/{pageCount}
                <Button disabled={pageNo === pageCount - 1} onClick={() => setPageNo(pageNo + 1)}>Next</Button>
            </Stack>
        </Col>
    )

}

export default Linije