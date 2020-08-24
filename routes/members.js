const mongoose = require('mongoose');
const express = require('express');
const { Member, validateMember } = require('../models/member');
const { Contact, validateContact } = require('../models/contact');
const router = express.Router();

router.get('/', async (req, res) => {
    const members = await Member.find().sort({ name: 1 });
    res.send(members);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const member = await Member.findById(id);

    if (!member) return res.status(404).send('The member with the given ID was not found.');

    res.send(member);
});

router.post('/', async (req, res) => {
    const { error } = validateMember(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (req.body.contact) {
        const { error } = validateContact(req.body.contact);
        if (error) return res.status(400).send(error.details[0].message);
        const member = new Member({
            name: req.body.name,
            contact: new Contact({
                phone: req.body.contact.phone,
                email: req.body.contact.email
            })
        });

        await member.save();
        return res.send(member);
    }

    const member = new Member({
        name: req.body.name
    });

    await member.save();
    return res.send(member);
});

router.put('/:id', async (req, res) => {
    const { error } = validateMember(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (req.body.contact) {
        const { error } = validateContact(req.body.contact);
        if (error) return res.status(400).send(error.details[0].message);
        const member = await Member.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                $set: {
                    'name': req.body.name,
                    'contact.phone': req.body.contact.phone,
                    'contact.email': req.body.contact.email
                }
            },
            {
                new: true
            }
        );

        if (!member) return res.status(404).send('The member with the given ID was not found.');
        return res.send(member);
    }

    let member = await Member.update({ _id: req.params.id }, { $set: { 'name': req.body.name } }, { new: true });
    if (!member) return res.status(404).send('The member with the given ID was not found.');
    return res.send(member);
});

router.delete('/:id', async (req, res) => {
    const member = await Member.findOneAndDelete({ _id: req.params.id });
    if (!member) return res.status(404).send('The member with the given ID was not found.');
    return res.send(member);
});

module.exports = router;