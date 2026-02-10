import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Button, Form, Card, Modal, Badge, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext); // Added logout to handle 401s
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Added error state
    const [showModal, setShowModal] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'pending'
    });

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        fetchTasks();
    }, [user, navigate]);

    const fetchTasks = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get('/api/tasks', config);
            setTasks(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            const errorMessage = err.response && err.response.data.message
                ? err.response.data.message
                : err.message;
            setError(errorMessage);
            setLoading(false);

            // If token is invalid/expired, logout user
            if (err.response && err.response.status === 401) {
                logout();
                navigate('/login');
            }
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setCurrentTask(null);
        setFormData({ title: '', description: '', status: 'pending' });
    };

    const handleShow = (task = null) => {
        if (task) {
            setCurrentTask(task);
            setFormData({
                title: task.title,
                description: task.description,
                status: task.status
            });
        }
        setShowModal(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        try {
            if (currentTask) {
                await axios.put(`/api/tasks/${currentTask._id}`, formData, config);
            } else {
                await axios.post('/api/tasks', formData, config);
            }
            fetchTasks();
            handleClose();
        } catch (error) {
            console.error(error);
             const errorMessage = error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
             alert(`Error: ${errorMessage}`);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                await axios.delete(`/api/tasks/${id}`, config);
                fetchTasks();
            } catch (error) {
                console.error(error);
                alert("Failed to delete task");
            }
        }
    };

    return (
        <Container className="py-5">
            <Row className="mb-4">
                <Col>
                    <h2>My Tasks</h2>
                </Col>
                <Col className="text-end">
                    <Button variant="primary" onClick={() => handleShow()}>
                        <FaPlus /> Add Task
                    </Button>
                </Col>
            </Row>

            {error && <Alert variant="danger">{error === "Not authorized, token failed" ? "Session expired. Please login again." : error}</Alert>}

            {loading ? (
                <Spinner animation="border" />
            ) : (
                <Row>
                    {tasks.map((task) => (
                        <Col key={task._id} md={6} lg={4} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-start">
                                        <Card.Title>{task.title}</Card.Title>
                                        <Badge bg={
                                            task.status === 'completed' ? 'success' :
                                            task.status === 'in-progress' ? 'warning' : 'secondary'
                                        }>
                                            {task.status}
                                        </Badge>
                                    </div>
                                    <Card.Text>{task.description}</Card.Text>
                                    <div className="d-flex justify-content-end gap-2">
                                        <Button variant="outline-primary" size="sm" onClick={() => handleShow(task)}>
                                            <FaEdit />
                                        </Button>
                                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(task._id)}>
                                            <FaTrash />
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                    {tasks.length === 0 && !error && <p>No tasks found. Create one!</p>}
                </Row>
            )}

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentTask ? 'Edit Task' : 'Add Task'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Dashboard;
