import React, { Component } from "react";
import { FaGitAlt, FaPlus, FaSpinner } from "react-icons/fa";

import api from "../../services/api";

import { Container, Form, SubmitButton } from "./styles";

class Main extends Component {
    state = {
        newReppo: "",
        repositories: [],
        loading: false,
    };

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
        const { newReppo, loading } = this.state;

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
            </Container>
        );
    }
}

export default Main;
