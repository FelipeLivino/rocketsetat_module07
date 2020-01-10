import React, { Component } from "react";
import { FaGitAlt, FaPlus } from "react-icons/fa";

import api from "../../services/api";

import { Container, Form, SubmitButton } from "./styles";

class Main extends Component {
    state = {
        newReppo: "",
    };

    handleInputChange = e => {
        this.setState({ newReppo: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();

        console.log(this.state.newReppo);
    };

    render() {
        const { newReppo } = this.state;

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

                    <SubmitButton>
                        <FaPlus color="#FFF" size={14} />
                    </SubmitButton>
                </Form>
            </Container>
        );
    }
}

export default Main;
