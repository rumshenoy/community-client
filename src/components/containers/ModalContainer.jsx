import {connect} from 'react-redux';
import {openModal, closeModal, selectTab} from '../../actions';
import Modal from '../presentationals/Modal.jsx';

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
  openModal: (obj) => dispatch(openModal(obj)),
  selectTab: (tab) => dispatch(selectTab(tab))
});

const mapStateToProps = (state) => ({
  isOpen: state.modals.isOpen,
  modalType: state.modals.modalType,
  modalProps: state.modals.modalProps,
  selectedTab: state.modals.selectedTab,
  bountyList: state.bounties.bountyList,
  hasStation: state.user.hasStation
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
