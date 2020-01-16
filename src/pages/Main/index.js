import React, { Component } from "react";
import { FaGitAlt, FaPlus, FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";

import api from "../../services/api";

import Container from "../../components/Container";
import { Form, SubmitButton, List } from "./styles";

class Main extends Component {
    state = {
        newReppo: "",
        repositories: [],
        loading: false,
    };

    // carregar os dados do local storage
    componentDidMount() {
        const repositories = localStorage.getItem("repositories");
        if (repositories) {
            this.setState({
                repositories: JSON.parse(repositories),
            });
        }
    }

    // salvar dados no local storage
    componentDidUpdate(_, prevstate) {
        const { repositories } = this.state;
        if (prevstate.repositories !== repositories) {
            localStorage.setItem("repositories", JSON.stringify(repositories));
        }
    }

    handleInputChange = e => {
        this.setState({ newReppo: e.target.value });
    };

    handleSubmit = async e => {
        e.preventDefault();

        this.setState({ loading: true });

        const { newReppo, repositories } = this.state;

        const response = await api.get(`/repos/${newReppo}`);

        const data = {
            name: response.data.full_name,
        };

        this.setState({
            repositories: [...repositories, data],
            newReppo: "",
            loading: false,
        });
    };

    render() {
        const { newReppo, repositories, loading } = this.state;

        return (
            <Container>
                <h1>
                    <FaGitAlt />
                    Repositórios
                </h1>

                <Form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="Adicionar repositório"
                        value={newReppo}
                        onChange={this.handleInputChange}
                    />

                    <SubmitButton loading={loading}>
                        {loading ? (
                            <FaSpinner color="#FFF" size={14} />
                        ) : (
                            <FaPlus color="#FFF" size={14} />
                        )}
                    </SubmitButton>
                </Form>
                <List>
                    {repositories.map(repository => (
                        <li key={repository.name}>
                            <span>{repository.name}</span>
                            <Link
                                to={`/repository/${encodeURIComponent(
                                    repository.name
                                )}`}
                            >
                                Detalhes
                            </Link>
                        </li>
                    ))}
                </List>
            </Container>
        );
    }
}

export default Main;
