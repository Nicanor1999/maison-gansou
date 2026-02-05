const versionOne = (routeName) => `/api/v1/${routeName}`;
const authRoutes = require('../modules/auth/routes/auth.routes.js');
const adminRoutes = require('../modules/admin/routes/admin.routes.js');
const AdminAuthRoutes = require('../modules/admin/routes/auth.admin.routes.js');
const reservationRoutes = require('../modules/admin/routes/reservation.routes.js');
const offerRoutes = require('../modules/admin/routes/offer.routes.js');
const tagsRoutes = require('../modules/admin/routes/tags.routes.js');
const sectionRoutes = require('../modules/admin/routes/section.routes.js');
const articleRoutes = require('../modules/admin/routes/article.routes.js');
const projectsRoutes = require('../modules/admin/routes/projects.routes.js');
const paymentRoutes = require('../modules/admin/routes/payment.routes.js');
const messageRoutes = require('../modules/admin/routes/message.routes.js');

module.exports = (app) => {
  app.use(versionOne('auth'), new authRoutes());
  app.use(versionOne('admin'), new adminRoutes());
  app.use(versionOne('admin/auth'), new AdminAuthRoutes());
  app.use(versionOne('reservation'), new reservationRoutes());
  app.use(versionOne('offer'), new offerRoutes());
  app.use(versionOne('tags'), new tagsRoutes());
  app.use(versionOne('section'), new sectionRoutes());
  app.use(versionOne('article'), new articleRoutes());
  app.use(versionOne('projects'), new projectsRoutes());
  app.use(versionOne('payment'), new paymentRoutes());
  app.use(versionOne('message'), new messageRoutes());
};