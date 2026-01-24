module.exports = class SharedAdminServices {

  constructor() {

  }
  /**
   * @createAdmin
   */
  createAdmin = async (payload, session = null) => {
    const AdminServices = new(require("./admin.services"))();
    return await AdminServices.create(payload, session);
  };
  /**
   * @updateAdmin
   */
  updateAdmin = async (query, payload, profile, session = null) => {
    const AdminServices = new(require("./admin.services"))();
    return await AdminServices.update(query, payload, profile, session);
  };
  /**
   * @deleteAdmin
   */
  deleteAdmin = async (query, profile, session = null) => {
    const AdminServices = new(require("./admin.services"))();
    return await AdminServices.delete(query, profile, session);
  };
  /**
   * @findAdminById
   */
  findAdminById = async (id, session = null) => {
    const AdminServices = new(require("./admin.services"))();
    return await AdminServices.findById(id, session);
  };
  /**
   * @getAdminList
   */
  getAdminList = async (querySchema, match = {
    matchIdentity: {}
  }, session = null) => {
    const AdminServices = new(require("./admin.services"))();
    return await AdminServices.getList(querySchema, match, session);
  };
  /**
   * @createReservation
   */
  createReservation = async (payload, session = null) => {
    const ReservationServices = new(require("./reservation.services"))();
    return await ReservationServices.create(payload, session);
  };
  /**
   * @updateReservation
   */
  updateReservation = async (query, payload, session = null) => {
    const ReservationServices = new(require("./reservation.services"))();
    return await ReservationServices.update(query, payload, session);
  };
  /**
   * @deleteReservation
   */
  deleteReservation = async (query, session = null) => {
    const ReservationServices = new(require("./reservation.services"))();
    return await ReservationServices.delete(query, session);
  };
  /**
   * @findReservationById
   */
  findReservationById = async (id, session = null) => {
    const ReservationServices = new(require("./reservation.services"))();
    return await ReservationServices.findById(id, session);
  };
  /**
   * @getReservationList
   */
  getReservationList = async (querySchema, match = {
    matchOffer: {}
  }, session = null) => {
    const ReservationServices = new(require("./reservation.services"))();
    return await ReservationServices.getList(querySchema, match, session);
  };
  /**
   * @createOffer
   */
  createOffer = async (payload, profile, session = null) => {
    const OfferServices = new(require("./offer.services"))();
    return await OfferServices.create(payload, profile, session);
  };
  /**
   * @updateOffer
   */
  updateOffer = async (query, payload, profile, session = null) => {
    const OfferServices = new(require("./offer.services"))();
    return await OfferServices.update(query, payload, profile, session);
  };
  /**
   * @deleteOffer
   */
  deleteOffer = async (query, profile, session = null) => {
    const OfferServices = new(require("./offer.services"))();
    return await OfferServices.delete(query, profile, session);
  };
  /**
   * @findOfferById
   */
  findOfferById = async (id, session = null) => {
    const OfferServices = new(require("./offer.services"))();
    return await OfferServices.findById(id, session);
  };
  /**
   * @getOfferList
   */
  getOfferList = async (querySchema, match = {
    matchCreatedBy: {},
    matchUpdatedBy: {},
    matchDeletedBy: {}
  }, session = null) => {
    const OfferServices = new(require("./offer.services"))();
    return await OfferServices.getList(querySchema, match, session);
  };
  /**
   * @createTags
   */
  createTags = async (payload, profile, session = null) => {
    const TagsServices = new(require("./tags.services"))();
    return await TagsServices.create(payload, profile, session);
  };
  /**
   * @updateTags
   */
  updateTags = async (query, payload, profile, session = null) => {
    const TagsServices = new(require("./tags.services"))();
    return await TagsServices.update(query, payload, profile, session);
  };
  /**
   * @deleteTags
   */
  deleteTags = async (query, profile, session = null) => {
    const TagsServices = new(require("./tags.services"))();
    return await TagsServices.delete(query, profile, session);
  };
  /**
   * @findTagsById
   */
  findTagsById = async (id, session = null) => {
    const TagsServices = new(require("./tags.services"))();
    return await TagsServices.findById(id, session);
  };
  /**
   * @getTagsList
   */
  getTagsList = async (querySchema, match = {
    matchCreatedBy: {},
    matchUpdatedBy: {},
    matchDeletedBy: {}
  }, session = null) => {
    const TagsServices = new(require("./tags.services"))();
    return await TagsServices.getList(querySchema, match, session);
  };
  /**
   * @createSection
   */
  createSection = async (payload, session = null) => {
    const SectionServices = new(require("./section.services"))();
    return await SectionServices.create(payload, session);
  };
  /**
   * @updateSection
   */
  updateSection = async (query, payload, session = null) => {
    const SectionServices = new(require("./section.services"))();
    return await SectionServices.update(query, payload, session);
  };
  /**
   * @deleteSection
   */
  deleteSection = async (query, session = null) => {
    const SectionServices = new(require("./section.services"))();
    return await SectionServices.delete(query, session);
  };
  /**
   * @findSectionById
   */
  findSectionById = async (id, session = null) => {
    const SectionServices = new(require("./section.services"))();
    return await SectionServices.findById(id, session);
  };
  /**
   * @getSectionList
   */
  getSectionList = async (querySchema, match = {}, session = null) => {
    const SectionServices = new(require("./section.services"))();
    return await SectionServices.getList(querySchema, match, session);
  };
  /**
   * @createArticle
   */
  createArticle = async (payload, profile, session = null) => {
    const ArticleServices = new(require("./article.services"))();
    return await ArticleServices.create(payload, profile, session);
  };
  /**
   * @updateArticle
   */
  updateArticle = async (query, payload, profile, session = null) => {
    const ArticleServices = new(require("./article.services"))();
    return await ArticleServices.update(query, payload, profile, session);
  };
  /**
   * @deleteArticle
   */
  deleteArticle = async (query, profile, session = null) => {
    const ArticleServices = new(require("./article.services"))();
    return await ArticleServices.delete(query, profile, session);
  };
  /**
   * @findArticleById
   */
  findArticleById = async (id, session = null) => {
    const ArticleServices = new(require("./article.services"))();
    return await ArticleServices.findById(id, session);
  };
  /**
   * @getArticleList
   */
  getArticleList = async (querySchema, match = {
    matchCreatedBy: {},
    matchUpdatedBy: {},
    matchDeletedBy: {},
    matchTags: {},
    matchSection: {}
  }, session = null) => {
    const ArticleServices = new(require("./article.services"))();
    return await ArticleServices.getList(querySchema, match, session);
  };
  /**
   * @createProjects
   */
  createProjects = async (payload, session = null) => {
    const ProjectsServices = new(require("./projects.services"))();
    return await ProjectsServices.create(payload, session);
  };
  /**
   * @updateProjects
   */
  updateProjects = async (query, payload, session = null) => {
    const ProjectsServices = new(require("./projects.services"))();
    return await ProjectsServices.update(query, payload, session);
  };
  /**
   * @deleteProjects
   */
  deleteProjects = async (query, session = null) => {
    const ProjectsServices = new(require("./projects.services"))();
    return await ProjectsServices.delete(query, session);
  };
  /**
   * @findProjectsById
   */
  findProjectsById = async (id, session = null) => {
    const ProjectsServices = new(require("./projects.services"))();
    return await ProjectsServices.findById(id, session);
  };
  /**
   * @getProjectsList
   */
  getProjectsList = async (querySchema, match = {
    matchSection: {}
  }, session = null) => {
    const ProjectsServices = new(require("./projects.services"))();
    return await ProjectsServices.getList(querySchema, match, session);
  };

}