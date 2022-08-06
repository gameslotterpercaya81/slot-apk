'use babel';

import SlotApkView from './slot-apk-view';
import { CompositeDisposable } from 'atom';

export default {

  slotApkView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.slotApkView = new SlotApkView(state.slotApkViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.slotApkView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'slot-apk:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.slotApkView.destroy();
  },

  serialize() {
    return {
      slotApkViewState: this.slotApkView.serialize()
    };
  },

  toggle() {
    console.log('SlotApk was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
