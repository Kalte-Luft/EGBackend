'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'UserDrivers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      driver_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'UserDrivers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      from_address: {
        type: Sequelize.JSON,
        allowNull: false
      },
      to_address: {
        type: Sequelize.JSON,
        allowNull: false
      },
      shipping_cost: {
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true
      },
      discount: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: true
      },
      status_code: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      completed_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      driver_accept_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      user_note: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      driver_note: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      driver_rate: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      distance: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: true
      },
      except_drivers: {
        type: Sequelize.JSON,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};
