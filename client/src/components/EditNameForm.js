

function EditNameForm () {

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: ''
    });

    function validateForm() {
        return( 
        formData.first_name.length > 0 &&
        formData.last_name.length > 0
        );
    }

    function handleSubmit(event) {
        const {first_name, last_name} = formData
        event.preventDefault();
        fetch("/students", {
        method: "POST", 
        headers: {
            'Content-Type':'application/json', 
        }, 
        body: JSON.stringify({
            first_name,
            last_name,
            teacher_id: '@current_user.id'
        })
        })
        .then((r) => {
        if (r.ok) {
            r.json()
            .then(student => {
                handleAddStudent(student)
            })
            // navigate('/homepage');
        } else
        r.json()
        .then((err) => {
            console.error(err)
        })
        })
        reset() 
    }
    const reset = () => {
        setFormData({
            first_name: '',
            last_name: '',
        })
    }


    return (
        <div className="studentForm">
        <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
                autoFocus
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
            />
            </Form.Group>
            <Form.Group size="lg" controlId="lastName">
            <Form.Label>lastName</Form.Label>
            <Form.Control
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
            />
            </Form.Group>
            <Button blocksize="lg" type="submit" disabled={!validateForm()}>
            Add Student!
            </Button>
        </Form>
        </div>
    )
}