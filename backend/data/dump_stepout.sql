
    CREATE TABLE IF NOT EXISTS poi (
      id SERIAL PRIMARY KEY,
      monument_id INTEGER,
      misc_id INTEGER,
      adresse_forme_editoriale TEXT,
      commune TEXT,
      code_insee INTEGER,
      position JSON
    );

    CREATE TABLE IF NOT EXISTS monument (
      id SERIAL PRIMARY KEY,
      poi_id INTEGER,
      is_main BOOLEAN,
      name TEXT,
      description TEXT,
      author TEXT,
      period TEXT
    );

    

      INSERT INTO poi (id, monument_id, misc_id, adresse_forme_editoriale, commune, code_insee, position)
      VALUES (0, 0, NULL, '41 rue Croix-Baragnon ; anciennement 23 rue Saint-Etienne', 'Toulouse', 31555, '{"lon":1.44831048815419,"lat":43.5997114776359}');
    

      INSERT INTO poi (id, monument_id, misc_id, adresse_forme_editoriale, commune, code_insee, position)
      VALUES (1, 1, NULL, 'place du Capitole', 'Toulouse', 31555, '{"lon":1.44423795256864,"lat":43.6044703168776}');
    

      INSERT INTO poi (id, monument_id, misc_id, adresse_forme_editoriale, commune, code_insee, position)
      VALUES (7, 3, NULL, 'place Saint-Etienne', 'Toulouse', 31555, '{"lon":1.45001335701579,"lat":43.59913948622981}');
    

      INSERT INTO poi (id, monument_id, misc_id, adresse_forme_editoriale, commune, code_insee, position)
      VALUES (8, NULL, 0, 'Quai de la Daurade', 'Toulouse', 31555, '{"lon":1.4395270695450704,"lat":43.60130051139837}');
    

      INSERT INTO poi (id, monument_id, misc_id, adresse_forme_editoriale, commune, code_insee, position)
      VALUES (9, NULL, 1, ' 1 Rue des Martyrs de la Libération', 'Toulouse', 31555, '{"lon":1.453425460883219,"lat":43.591928469780726}');
    

      INSERT INTO poi (id, monument_id, misc_id, adresse_forme_editoriale, commune, code_insee, position)
      VALUES (10, NULL, 2, ' 59 rue d’Alsace-Lorraine', 'Toulouse', 31555, '{"lon":1.4456902783773626,"lat":43.60615287009547}');
    

      INSERT INTO poi (id, monument_id, misc_id, adresse_forme_editoriale, commune, code_insee, position)
      VALUES (11, NULL, 3, ' 30 Rue de la Dalbade', 'Toulouse', 31555, '{"lon":1.4421984423307637,"lat":43.59768237637071}');
    

      INSERT INTO monument (id, poi_id, is_main, name, description, author, period)
      VALUES (0, 0, TRUE, 'Ancien hôtel de Bonfontan', '', 'Ortet (maître de l''oeuvre)', '');
    

      INSERT INTO monument (id, poi_id, is_main, name, description, author, period)
      VALUES (1, 1, TRUE, 'Hôtel de ville appelé Le Capitole', 'Ancienne maison de ville datant du 12e siècle, avec un portail Renaissance dans la cour Henri IV. Les galeries latérales sont construites par l''architecte Pierre Souffron entre 1602 et 1606. Une nouvelle façade est réalisée par l''architecte Guillaume Cammas entre 1750 et 1760. La façade orientale est l''oeuvre de l''architecte Henri Lefuel en 1883. La salle des Illustres est réalisée de 1892 à 1898 par le peintre et sculpteur Paul Pujol avec une pléiade d''artistes. La salle des pas perdus est décorée par le peintre Henri Martin entre 1903 et 1906. Le grand escalier est reconstruit en 1912 et décoré par le peintre Jean-Paul Laurens avec ses fils Jean-Pierre et Paul-Albert. La salle des mariages est décorée vers 1914 par le peintre Paul Gervais. La salle du Conseil municipal, enfin, terminée en 1935, et décorée par les peintres A. P. Lupiac, Henri Bonis, Edouard Debat-Ponsan, Constantin Font, Edmond Yarz, André Roucolle, J. Courapied et William Didier-Pouget.', 'Cammas Guillaume (architecte);Souffron Pierre (architecte);Lefuel Henri (architecte);Pujol Paul (peintre);Martin Henri (peintre);Laurens Jean-Paul (peintre);Laurens Jean-Pierre (peintre);Laurens Paul-Albert (peintre);Lupiac A. P. (peintre);Bonis Henri (peintre);Debat-Ponsan Edouard (peintre);Font Constantin (peintre);Yarz Edmond (peintre);Roucolle André (peintre);Courapied J. (peintre);Didier-Pouget William (peintre);Gervais Paul (peintre)', '');
    

      INSERT INTO monument (id, poi_id, is_main, name, description, author, period)
      VALUES (3, 7, FALSE, 'Ancien palais archiépiscopal', 'Après avoir vécu avec leurs chanoines dans l''enceinte du cloître, les archevêques de Toulouse établirent leur résidence au-delà de la tour Mascaron. Bâti du 14e au 16e siècle, le premier évêché est détruit à la fin du 17e siècle et reconstruit en 1691. De cette époque reste le bâtiment correspondant à l''aile perpendiculaire à oculi sur jardin qui comportait, au premier étage, une chapelle. La reconstruction se poursuit en 1693 sous la direction de l''architecte d''Aviler qui organise le plan actuel en U autour d''une cour centrale. A partir de 1776, l''architecte Jean-Arnaud Raymond exécute le bâtiment entre les n° 7 et 13, destiné à recevoir la ''chambre souveraine du clergé'' et les archives diocésaines.', 'D''Aviler Augustin-Charles;(architecte);Raymond Jean-Arnaud (architecte)', '');
    
