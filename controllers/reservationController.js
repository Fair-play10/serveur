const prisma = require('../prismaClient');

const createReservation = async (req, res) => {
  try {
    const reservation = await prisma.reservation.create({
      data: req.body,
    });
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create reservation' });
  }
};

const getReservations = async (req, res) => {
  try {
    const reservations = await prisma.reservation.findMany();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch reservations' });
  }
};

module.exports = {
  createReservation,
  getReservations,
};
