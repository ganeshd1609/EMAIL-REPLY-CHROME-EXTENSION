import {Container , Typography , Box , TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';


import './App.css'
import { useState } from 'react'

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try{
      const response = await axios.post('http://localhost:8080/api/email/generate', {
        emailContent,
        tone
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data))
    } catch (error) {
      console.error('Error generating reply:', error);
    } finally {
      setLoading(false);
    }


  }

  return (
   
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Email Reply Generator AI
        </Typography>
       
       <Box sx={{mx:3}}>
          <TextField
            fullWidth
            multiline
            rows={6}
            label="Original Email Content"
            variant="outlined"
            value={emailContent || ''}
            onChange={(e) => setEmailContent(e.target.value)}
            sx={{ mb: 2 }}
            
          />


      <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel >Tone (Optional)</InputLabel>
              <Select
                
                value={tone || ''}
                onChange={(e) => setTone(e.target.value)}
                autoWidth
                label="Tone (Optional)"
              >
                
                <MenuItem value="">None</MenuItem>
                <MenuItem value="formal">Formal</MenuItem>
                <MenuItem value="casual">Casual</MenuItem>
                <MenuItem value="friendly">Friendly</MenuItem>
              </Select>
      </FormControl>

   
      <Button variant="contained"
        sx={{ mb: 2 }} 
        color="primary" 
        onClick={handleSubmit} 
        disabled= {!emailContent || loading}>
          {loading ? <CircularProgress size={24}  /> : "Generate Reply"}
          
        </Button>
      
   
       </Box>




          <Box sx={{mx:3}}>
          <TextField
            fullWidth
            multiline
            rows={6}
          
            variant="outlined"
            value={generatedReply || ''}
            inputProps={{ readOnly: true }}
            sx={{ mb: 2 }}
            
          />


          <Button variant="outlined"
          onClick={() => navigator.clipboard.writeText(generatedReply)}
          >Copy To Clipboard</Button>






             </Box>



      </Container>
    
  )
}

export default App
