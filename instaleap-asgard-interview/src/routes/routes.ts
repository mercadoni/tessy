import { Router } from 'express';

const router = Router();

router.post('/event', (req, res) => {
 console.log(` Event received{${JSON.stringify(req.body)}}`); 
    //TODO: Something is missing here
    res.status(201).json({ message: 'Event created successfully' });
});

export default router;