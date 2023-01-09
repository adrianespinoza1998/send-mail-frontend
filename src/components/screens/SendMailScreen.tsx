import { Box, Button, Container, createTheme, CssBaseline, TextField, ThemeProvider, Typography } from "@mui/material";
import axios from "axios";
import { useCallback, useState } from "react";

const theme = createTheme();

const SendMailScreen = () => {
	const [form, setForm] = useState({
	    email: '',
	    asunto: '',
	    cuerpo: ''
	});

    const [validarMail, setValidarMail] = useState(false);

    const { email, asunto, cuerpo } = form;
    
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const handleChange = useCallback((e: any) => {
        if(e.target.name === 'email'){
            setValidarMail(!emailRegex.test(e.target.value));
        }

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }, [form, validarMail]);

    const handleSubmit = useCallback(async(e: any) => {
        e.preventDefault();

		if(!validarMail && asunto.length > 0 && cuerpo.length > 0){
			try {
				await axios({
					url: `${import.meta.env.VITE_BACKEND_URL}/api/v1/mail/send`,
					method: 'POST',
					data: form
				});

				alert("Correo enviado correctamente");
			} catch (error) {
				alert("Error al enviar el correo");

				console.log(error);
			}
		}else{
			alert('Debe llenar todos los campos');
		}
    }, [form]);

	return (
		<ThemeProvider theme={theme}>
		    <Container component="main" maxWidth="xs">
		        <CssBaseline />
		        <Box
		          sx={{
		            display: 'flex',
		            flexDirection: 'column',
		            alignItems: 'center',
		          }}
		        >
		            <Typography component="h1" variant="h5">
		                Enviar correo electronico
		            </Typography>
		            <Box 
		                component="form"
		                noValidate sx={{ mt: 1 }}
		                onSubmit={handleSubmit}
		            >
		                <TextField
		                    margin="normal"
		                    required
		                    fullWidth
		                    label="Correo electronico"
		                    name="email"
		                    value={email}
		                    onChange={handleChange}
		                    autoComplete="email"
		                    autoFocus
		                    error={validarMail}
		                    helperText={validarMail ? 'Correo electronico no valido' : ''}
		                    type="email"
		                />
		                <TextField
		                    margin="normal"
		                    required
		                    fullWidth
		                    label="Asunto"
		                    name="asunto"
		                    value={asunto}
		                    onChange={handleChange}
		                    type="text"
		                />
		                <TextField
		                    margin="normal"
		                    required
		                    fullWidth
		                    name="cuerpo"
		                    label="Cuerpo del correo"
		                    type="text"
		                    value={cuerpo}
		                    onChange={handleChange}
		                    minRows={3}
		                    multiline 
		                />
		                <Button
		                  type="submit"
		                  fullWidth
		                  variant="contained"
		                  sx={{ mt: 3, mb: 2 }}
		                >
		                  Enviar
		                </Button>
		            </Box>
		        </Box>
		    </Container>
		</ThemeProvider>
	)
}

export default SendMailScreen;